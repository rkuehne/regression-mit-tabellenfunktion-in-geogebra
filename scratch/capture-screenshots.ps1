$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$shots = @(
  @{ name = 'scratch\01-index-selection-1280.png'; url = 'http://localhost:8085/index.html'; size = '1280,900' },
  @{ name = 'scratch\02-coulomb-step1-1280.png'; url = 'http://localhost:8085/index.html?course=inverse-square#course'; size = '1280,900' },
  @{ name = 'scratch\03-charging-deviations-1280.png'; url = 'http://localhost:8085/index.html?course=capacitor-exponential&step=charging-deviations#course'; size = '1280,900' },
  @{ name = 'scratch\04-selbst-auswerten-1280.png'; url = 'http://localhost:8085/selbst-auswerten.html'; size = '1280,900' },
  @{ name = 'scratch\05-dokumentation-1280.png'; url = 'http://localhost:8085/dokumentation.html?course=proportional-linear&section=deviations'; size = '1280,900' },
  @{ name = 'scratch\06-groesster-einzelfehler-1280.png'; url = 'http://localhost:8085/groesster-einzelfehler.html'; size = '1280,900' },
  @{ name = 'scratch\07-coulomb-mobile-375.png'; url = 'http://localhost:8085/index.html?course=inverse-square#course'; size = '375,812' },
  @{ name = 'scratch\08-selbst-split-512.png'; url = 'http://localhost:8085/selbst-auswerten.html'; size = '512,768' },
  @{ name = 'scratch\09-coulomb-tablet-768.png'; url = 'http://localhost:8085/index.html?course=inverse-square#course'; size = '768,1024' }
)
foreach ($shot in $shots) {
  $out = $shot.name
  $url = $shot.url
  $dim = $shot.size
  & $chrome --headless --disable-gpu "--window-size=$dim" "--screenshot=$out" $url
  Write-Host "Captured $out"
}
