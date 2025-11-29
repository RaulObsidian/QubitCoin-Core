@echo off
echo Compilando whitepapers...

cd /d "D:\Proyecto_QBC\whitepaper"

echo Compilando whitepaper en español...
xelatex -include-directory=. -output-directory=. QbitCoin_Whitepaper_v1.0.tex
xelatex -include-directory=. -output-directory=. QbitCoin_Whitepaper_v1.0.tex
xelatex -include-directory=. -output-directory=. QbitCoin_Whitepaper_v1.0.tex

echo Compilando whitepaper en inglés...
xelatex -include-directory=. -output-directory=. QbitCoin_Whitepaper_v1.0_EN.tex
xelatex -include-directory=. -output-directory=. QbitCoin_Whitepaper_v1.0_EN.tex
xelatex -include-directory=. -output-directory=. QbitCoin_Whitepaper_v1.0_EN.tex

echo Compilando whitepaper en alemán...
xelatex -include-directory=. -output-directory=. QbitCoin_Whitepaper_v1.0_DE.tex
xelatex -include-directory=. -output-directory=. QbitCoin_Whitepaper_v1.0_DE.tex
xelatex -include-directory=. -output-directory=. QbitCoin_Whitepaper_v1.0_DE.tex

echo Compilación de whitepapers completada.