# Senarai fail mengikut susunan yang diminta
$files = @(
    "index.html",
    "style.css",
    "script.js",
    "ui.js",
    "main.js",
    "apiservice.js"
)

# Nama fail output
$outputFile = "output.md"

# Kosongkan atau cipta output.md
Set-Content -Path $outputFile -Value ""

# Tambah kandungan setiap fail dalam format Markdown
foreach ($file in $files) {
    if (Test-Path $file) {
        Add-Content -Path $outputFile -Value "## $file`n"
        Add-Content -Path $outputFile -Value (Get-Content $file)
        Add-Content -Path $outputFile -Value "`n"
    } else {
        Add-Content -Path $outputFile -Value "## $file`n(Fail tidak dijumpai)`n"
    }
}

Write-Host "✅ output.md berjaya dijana dalam format tajuk Markdown."
