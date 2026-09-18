Add-Type -AssemblyName System.Drawing

$assetDir = Join-Path $PSScriptRoot "assets\steps\uq"
[System.IO.Directory]::CreateDirectory($assetDir) | Out-Null

$fontFamily = "Segoe UI"
$ink = [System.Drawing.Color]::FromArgb(58, 58, 61)
$muted = [System.Drawing.Color]::FromArgb(112, 112, 115)
$line = [System.Drawing.Color]::FromArgb(224, 223, 230)
$header = [System.Drawing.Color]::FromArgb(248, 248, 250)
$violet = [System.Drawing.Color]::FromArgb(101, 82, 200)
$violetSoft = [System.Drawing.Color]::FromArgb(238, 234, 253)
$white = [System.Drawing.Color]::White

function New-Font([float]$size, [System.Drawing.FontStyle]$style = [System.Drawing.FontStyle]::Regular) {
  return [System.Drawing.Font]::new($fontFamily, $size, $style, [System.Drawing.GraphicsUnit]::Pixel)
}

function Draw-Text($graphics, [string]$text, [float]$x, [float]$y, [float]$size = 18, $color = $ink, $style = [System.Drawing.FontStyle]::Regular) {
  $font = New-Font $size $style
  $brush = [System.Drawing.SolidBrush]::new($color)
  $graphics.DrawString($text, $font, $brush, $x, $y)
  $font.Dispose()
  $brush.Dispose()
}

function New-Shot([int]$width, [int]$height, [switch]$Algebra) {
  $bitmap = [System.Drawing.Bitmap]::new($width, $height)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
  $graphics.Clear($white)

  $graphics.FillRectangle([System.Drawing.SolidBrush]::new($header), 0, 0, $width, 72)
  $graphics.DrawLine([System.Drawing.Pen]::new($line, 1), 0, 71, $width, 71)
  Draw-Text $graphics "Menu" 18 20 17 $muted ([System.Drawing.FontStyle]::Bold)
  $modeX = $width - 250
  $graphics.DrawRectangle([System.Drawing.Pen]::new($line, 1), $modeX, 10, 235, 48)
  Draw-Text $graphics "Grafikrechner" ($modeX + 28) 18 20 $ink
  Draw-Text $graphics "GeoGebra  Rechner Suite" 86 11 34 $muted

  $graphics.FillRectangle([System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(250, 250, 251)), 0, 72, 82, $height - 72)
  $graphics.DrawLine([System.Drawing.Pen]::new($line, 1), 81, 72, 81, $height)
  $side = @(@("A", "Algebra"), @("W", "Werkzeuge"), @("T", "Tabelle"), @("#", "Tabellenkalkulation"))
  for ($i = 0; $i -lt $side.Count; $i++) {
    $y = 105 + $i * 94
    $active = ($Algebra -and $i -eq 0) -or (-not $Algebra -and $i -eq 3)
    Draw-Text $graphics $side[$i][0] 27 $y 25 $(if ($active) { $violet } else { $muted })
    if ($i -eq 3) {
      Draw-Text $graphics "Tabellen-" 5 ($y + 31) 11 $(if ($active) { $violet } else { $muted })
      Draw-Text $graphics "kalkulation" 5 ($y + 45) 11 $(if ($active) { $violet } else { $muted })
    } else {
      Draw-Text $graphics $side[$i][1] 5 ($y + 34) 13 $(if ($active) { $violet } else { $muted })
    }
  }
  return @($bitmap, $graphics)
}

function Draw-Table($graphics, [int]$width, [int]$height, [string[]]$columns, [object[][]]$rows, [int]$selectedColumn = -1, [int]$selectedFrom = -1, [int]$selectedTo = -1) {
  $left = 82
  $top = 72
  $toolbarHeight = 58
  $rowHeader = 66
  $available = $width - $left - $rowHeader
  $colWidth = [Math]::Floor($available / $columns.Count)

  $graphics.FillRectangle([System.Drawing.SolidBrush]::new($white), $left, $top, $width - $left, $toolbarHeight)
  Draw-Text $graphics "Fill     A    B    I      Align      Sum      Chart" ($left + 22) ($top + 17) 18 $muted ([System.Drawing.FontStyle]::Bold)
  $gridTop = $top + $toolbarHeight
  $graphics.FillRectangle([System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(244, 243, 247)), $left, $gridTop, $width - $left, 46)
  $pen = [System.Drawing.Pen]::new($line, 1)
  for ($c = 0; $c -le $columns.Count; $c++) {
    $x = $left + $rowHeader + $c * $colWidth
    $graphics.DrawLine($pen, $x, $gridTop, $x, $height)
  }
  $graphics.DrawLine($pen, $left, $gridTop + 46, $width, $gridTop + 46)

  for ($c = 0; $c -lt $columns.Count; $c++) {
    Draw-Text $graphics $columns[$c] ($left + $rowHeader + $c * $colWidth + $colWidth / 2 - 8) ($gridTop + 9) 21 $ink
  }
  $rowHeight = 45
  for ($r = 0; $r -lt 7; $r++) {
    $y = $gridTop + 46 + $r * $rowHeight
    $graphics.FillRectangle([System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(247, 246, 249)), $left, $y, $rowHeader, $rowHeight)
    $graphics.DrawLine($pen, $left, $y + $rowHeight, $width, $y + $rowHeight)
    Draw-Text $graphics ([string]($r + 1)) ($left + 28) ($y + 10) 17 $ink
    if ($r -lt $rows.Count) {
      for ($c = 0; $c -lt [Math]::Min($columns.Count, $rows[$r].Count); $c++) {
        $value = [string]$rows[$r][$c]
        $font = New-Font 17
        $measure = $graphics.MeasureString($value, $font)
        $x = $left + $rowHeader + ($c + 1) * $colWidth - $measure.Width - 9
        Draw-Text $graphics $value $x ($y + 10) 17 $(if ($c -eq 2 -and $value.StartsWith("(")) { $muted } else { $ink })
        $font.Dispose()
      }
    }
  }
  if ($selectedColumn -ge 0) {
    $x = $left + $rowHeader + $selectedColumn * $colWidth
    $y = $gridTop + 46 + $selectedFrom * $rowHeight
    $h = ($selectedTo - $selectedFrom + 1) * $rowHeight
    $graphics.FillRectangle([System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(28, 101, 82, 200)), $x, $y, $colWidth, $h)
    $graphics.DrawRectangle([System.Drawing.Pen]::new($violet, 3), $x + 1, $y + 1, $colWidth - 2, $h - 2)
    $graphics.FillRectangle([System.Drawing.SolidBrush]::new($violet), $x + $colWidth - 6, $y + $h - 6, 9, 9)
  }
  $pen.Dispose()
}

function Add-FormulaBox($graphics, [int]$width, [string]$formula, [int]$columnIndex, [int]$columnCount, [int]$row = 0) {
  $left = 82
  $rowHeader = 66
  $gridTop = 176
  $rowHeight = 45
  $colWidth = [Math]::Floor(($width - $left - $rowHeader) / $columnCount)
  $x = $left + $rowHeader + $columnIndex * $colWidth
  $y = $gridTop + $row * $rowHeight
  $graphics.FillRectangle([System.Drawing.SolidBrush]::new($violetSoft), $x + 2, $y + 2, $colWidth - 4, $rowHeight - 4)
  $graphics.DrawRectangle([System.Drawing.Pen]::new($violet, 3), $x + 1, $y + 1, $colWidth - 2, $rowHeight - 2)
  $formulaSize = if ($formula.Length -gt 18) { 12 } else { 17 }
  Draw-Text $graphics $formula ($x + 8) ($y + 11) $formulaSize $muted
}

function Save-Shot([string]$name, [int]$width, [int]$height, [scriptblock]$draw, [switch]$Algebra) {
  $pair = New-Shot $width $height -Algebra:$Algebra
  $bitmap = $pair[0]
  $graphics = $pair[1]
  & $draw $graphics $width $height
  $target = Join-Path $assetDir $name
  $bitmap.Save($target, [System.Drawing.Imaging.ImageFormat]::Png)
  $graphics.Dispose()
  $bitmap.Dispose()
}

$baseRows = @(
  @("50", "2"), @("100", "4.3"), @("150", "6.4"), @("200", "8.3"), @("250", "10.2")
)
$pointRows = @(
  @("50", "2", "(50, 2)"), @("100", "4.3", "(100, 4.3)"), @("150", "6.4", "(150, 6.4)"), @("200", "8.3", "(200, 8.3)"), @("250", "10.2", "(250, 10.2)")
)
$ratioRows = @(
  @("50", "2", "0.04"), @("100", "4.3", "0.043"), @("150", "6.4", "0.0426666667"), @("200", "8.3", "0.0415"), @("250", "10.2", "0.0408")
)
$meanRows = @(
  @("50", "2", "0.04", "0.0415933333"), @("100", "4.3", "0.043", "0.0415933333"), @("150", "6.4", "0.0426666667", "0.0415933333"), @("200", "8.3", "0.0415", "0.0415933333"), @("250", "10.2", "0.0408", "0.0415933333")
)
$deviationRows = @(
  @("50", "2", "0.04", "0.0415933333", "-3.8307421"), @("100", "4.3", "0.043", "0.0415933333", "3.3819522"), @("150", "6.4", "0.0426666667", "0.0415933333", "2.5805418"), @("200", "8.3", "0.0415", "0.0415933333", "-0.2243949"), @("250", "10.2", "0.0408", "0.0415933333", "-1.9073569")
)
$modelRows = @(
  @("50", "2", "(50, 2)", "2.056011", "-2.72426"), @("100", "4.3", "(100, 4.3)", "4.145121", "3.736416"), @("150", "6.4", "(150, 6.4)", "6.246909", "2.450669"), @("200", "8.3", "(200, 8.3)", "8.356973", "-0.681737"), @("250", "10.2", "(250, 10.2)", "10.473211", "-2.608669")
)
$linearModelRows = @(
  @("50", "2", "(50, 2)", "2.16", "-7.407407"), @("100", "4.3", "(100, 4.3)", "4.2", "2.380952"), @("150", "6.4", "(150, 6.4)", "6.24", "2.564103"), @("200", "8.3", "(200, 8.3)", "8.28", "0.241546"), @("250", "10.2", "(250, 10.2)", "10.32", "-1.162791")
)

Save-Shot "01-messwerte-u-q.png" 900 500 { param($g,$w,$h) Draw-Table $g $w $h @("A","B","C") $baseRows }
Save-Shot "02-punkte-u-q.png" 900 500 { param($g,$w,$h) Draw-Table $g $w $h @("A","B","C") $pointRows 2 0 4 }
Save-Shot "03-konstante-formel.png" 900 500 { param($g,$w,$h) Draw-Table $g $w $h @("A","B","C") $baseRows; Add-FormulaBox $g $w "= B1 / A1" 2 3 }
Save-Shot "04-konstanten-ausgefuellt.png" 900 500 { param($g,$w,$h) Draw-Table $g $w $h @("A","B","C") $ratioRows 2 0 4 }
Save-Shot "05-mittelwert.png" 900 500 { param($g,$w,$h)
  Draw-Text $g "Mittel(C1:C5)" 176 88 23 $ink
  Draw-Text $g "=   0.0415933333333" 176 137 22 $ink
  $g.DrawLine([System.Drawing.Pen]::new($violet,1), 84, 174, $w, 174)
} -Algebra
Save-Shot "06-mittelwert-in-d1.png" 900 500 { param($g,$w,$h) Draw-Table $g $w $h @("A","B","C","D") $ratioRows; Add-FormulaBox $g $w "= a" 3 4 }
Save-Shot "07-mittelwert-ausgefuellt.png" 900 500 { param($g,$w,$h) Draw-Table $g $w $h @("A","B","C","D") $meanRows 3 0 4 }
Save-Shot "08-konstantenabweichung-formel.png" 1040 500 { param($g,$w,$h) Draw-Table $g $w $h @("A","B","C","D","E") $meanRows; Add-FormulaBox $g $w "= (C1 - D1) / D1 * 100" 4 5 }
Save-Shot "09-konstantenabweichungen.png" 1040 500 { param($g,$w,$h) Draw-Table $g $w $h @("A","B","C","D","E") $deviationRows 4 0 4 }
Save-Shot "10-potenzregression-u-q.png" 900 500 { param($g,$w,$h)
  Draw-Text $g "Q(x) = TrendPot(C1:C5)" 176 88 23 $ink
  Draw-Text $g "=   0.0393011136375 x^1.0115661789611" 176 137 21 $ink
  $g.DrawLine([System.Drawing.Pen]::new($violet,1), 84, 174, $w, 174)
} -Algebra
Save-Shot "11-modellwerte-u-q.png" 1040 500 { param($g,$w,$h) Draw-Table $g $w $h @("A","B","C","D","E") $modelRows 3 0 4 }
Save-Shot "12-lineare-regression-u-q.png" 900 500 { param($g,$w,$h)
  Draw-Text $g "Q = Trendlinie(C1:C5)" 176 88 23 $ink
  Draw-Text $g "y = 0.0408 x + 0.12" 176 137 22 $ink
  $g.DrawLine([System.Drawing.Pen]::new($violet,1), 84, 174, $w, 174)
} -Algebra
Save-Shot "13-lineare-modellwerte-u-q.png" 1040 500 { param($g,$w,$h) Draw-Table $g $w $h @("A","B","C","D","E") $linearModelRows 3 0 4 }
