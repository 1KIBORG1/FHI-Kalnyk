/* 1. úloha
BMI index - funkcia, ktorá má vstupné parametre hmotnosť v kg a výšku v cm a vráti, či má daná osoba podváhu (BMI<=19), normálnu hmotnosť (19<BMI<=25),
nadváhu (25<BMI<=30) alebo obezitu a koľko kg musí schudnúť/pribrať, aby mal normálnu hmotnosť.

#### *Ako vypočítať BMI?*

+ *Vypočíta sa vydelením hmotnosti daného človeka druhou mocninou jeho výšky.*

#### *BMI = m / h²*

+ **m** *= telesná hmotnosť v kilogramoch*
+ **h** *= telesná výška v metroch*

---
*/

function calculateBMI(weightKg: number, heightCm: number) {
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    let category = '';
    let kgToLose = 0;
    let kgToGain = 0;

    if (bmi <= 19) {
        category = 'podváha';
        kgToGain = +(19 * (heightM * heightM) - weightKg).toFixed(1);
        kgToLose = 0;
    } else if (bmi <= 25) {
        category = 'normálna hmotnosť';
        kgToLose = 0;
        kgToGain = 0;
    } else if (bmi <= 30) {
        category = 'nadváha';
        kgToLose = +(weightKg - 25 * (heightM * heightM)).toFixed(1);
        kgToGain = 0;
    } else {
        category = 'obezita';
        kgToLose = +(weightKg - 25 * (heightM * heightM)).toFixed(1);
        kgToGain = 0;
    }

    return {
        BMI: bmi,
        kategoria: category,
        kg_na_schudnutie: kgToLose,
        kg_na_pribratie: kgToGain
    };
}

/*
## 2. úloha
Napíšte funkciu, ktorá dostane vetu (max. 255 znakov), spočíta počet výskytov jednotlivých písmen vo vete (nerozlišuje veľké a malé písmená)
a vypíše prehľadnú tabuľku.

- Napr.:
    - pre slovo Alabama:
        - a 4
        - l 1
        - b 1
        - m 1
*/

function calculateLetters(text: string) {
    let textLC = text.toLowerCase();
    let letterCounts: { [key: string]: number } = {};

    for (const ch of textLC) {
        if (ch < 'a' || ch > 'z') {
            continue;
        }
        letterCounts[ch] = (letterCounts[ch] || 0) + 1;
    }

    for (const key in letterCounts) {
        console.log(key, letterCounts[key]);
    }
}




// MAIN CODE

//TASK №1
const result = calculateBMI(60, 160);
console.log(result);

//TASK №2
calculateLetters("Alabama");