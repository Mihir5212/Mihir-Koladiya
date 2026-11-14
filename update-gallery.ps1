# Rebuilds the gallery photo list in js/data.js from assets/images/gallery/.
# Reads each photo's date (camera EXIF, else from the filename, else file date)
# and sorts newest first. Captions already typed in data.js are kept.
# Also shrinks big new photos for fast loading (originals saved in ..\gallery-originals).
# Run after adding/removing photos: right-click > Run with PowerShell.
Add-Type -AssemblyName System.Drawing
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$dataPath = Join-Path $root 'js\data.js'
$data = [IO.File]::ReadAllText($dataPath)

# Shrink big photos for the web (needs Python + Pillow; originals saved to ..\gallery-originals)
$py = Get-Command python -ErrorAction SilentlyContinue
if ($py) { & $py.Source (Join-Path $root 'optimize-gallery.py') } else { Write-Host 'Python not found - skipping photo shrinking' }

function Get-ExifDate($f, $ids) {
  try {
    $img = [System.Drawing.Image]::FromFile($f.FullName)
    try {
      foreach ($id in $ids) {
        if ($img.PropertyIdList -contains $id) {
          $t = [Text.Encoding]::ASCII.GetString($img.GetPropertyItem($id).Value).Trim([char]0, ' ')
          if ($t -match '^(\d{4}):(\d{2}):(\d{2})' -and $matches[1] -ne '0000') { return "$($matches[1])-$($matches[2])-$($matches[3])" }
        }
      }
    } finally { $img.Dispose() }
  } catch {}
  return $null
}

# Priority: date in filename > camera "taken" date > EXIF "modified" date > file date
function Get-PhotoDate($f) {
  if ($f.Name -match '(20\d{2})(\d{2})(\d{2})') { return "$($matches[1])-$($matches[2])-$($matches[3])" }
  $d = Get-ExifDate $f @(0x9003, 0x9004); if ($d) { return $d }
  $d = Get-ExifDate $f @(0x0132); if ($d) { return $d }
  return $f.LastWriteTime.ToString('yyyy-MM-dd')
}

$items = Get-ChildItem (Join-Path $root 'assets\images\gallery') -File |
  Where-Object { $_.Extension -match '^\.(jpe?g|png|webp|gif)$' } | ForEach-Object {
    $src = "assets/images/gallery/$($_.Name)"
    $m = [regex]::Match($data, '(?m)^\s*\{ src: "' + [regex]::Escape($src) + '".*\},\s*$')
    $caption = ''; $desc = ''; $cat = 'Moments'
    if ($m.Success) {
      if ($m.Value -match 'caption: "([^"]*)"') { $caption = $matches[1] }
      if ($m.Value -match 'category: "([^"]*)"') { $cat = $matches[1] }
      if ($m.Value -match 'desc: "([^"]*)"') { $desc = $matches[1] }
    }
    [pscustomobject]@{ Src = $src; Date = (Get-PhotoDate $_); Caption = $caption; Desc = $desc; Cat = $cat }
  } | Sort-Object Date, Src -Descending

$lines = foreach ($i in $items) { "    { src: `"$($i.Src)`", date: `"$($i.Date)`", caption: `"$($i.Caption)`", desc: `"$($i.Desc)`", category: `"$($i.Cat)`" }," }
$block = "  GALLERY: [`n" + ($lines -join "`n") + "`n  ],"
$data = [regex]::Replace($data, '(?s)  GALLERY: \[.*?\n  \],', { param($x) $block })
[IO.File]::WriteAllText($dataPath, $data, (New-Object Text.UTF8Encoding $false))
Write-Host "Gallery updated: $(@($items).Count) photos, newest first"
