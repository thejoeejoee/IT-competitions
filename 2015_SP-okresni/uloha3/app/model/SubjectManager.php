<?php

namespace App\Model;

use Nette\InvalidStateException;
use Nette\Object;

/**
 * Video model
 */
class SubjectManager extends Object {

    /** @var Subject[] */
    private $subjects;

    public function __construct() {
        $janKozina = 'Ing. Jan Kozina, Slavíčkova 2491/14, 702 00, Ostrava - Moravská Ostrava, IČ 15494641';

        $this->subjects = array(
            new Subject('uvod-do-socialnich-siti-a-cloudovych-sluzeb', 'Úvod do sociálních sítí a cloudových služeb', array()),
            new Subject('prace-s-e-cteckou-QR-kody-ve-vyuce', 'Práce s e-čtečkou – QR kódy ve výuce', array()),
            new Subject('formatovani-textu', 'Formátování textu', array(
                new Video('druhy-pisma', 'Druhy písma'),
                new Video('formatovani-pisma', 'Formátování písma'),
                new Video('zarovnani-odastavce', 'Zarovnání odstavce'),
                new Video('mezery-v-odstavci', 'Mezery v odstavci'),
                new Video('odrazky-a-cislovani', 'Odrážky a číslování'),
                new Video('tabulatory', 'Tabulátory'),
                new Video('kopirovani-formatu', 'Kopírování formátu'),
                new Video('styly', 'Styly'),
                new Video('oddily', 'Oddíly'),
                new Video('revize', 'Revize'),
                new Video('obsah', 'Obsah'),
            ), $janKozina),
            new Subject('tvorba-kreativni-prezentace-a-vkladani-multimedii', 'Tvorba kreativní prezentace a vkládání multimédií', array(
                new Video('prace-s-prezentaci', 'Práce s prezentací'),
                new Video('promitani-prezentace', 'Promítání prezentace'),
                new Video('vytvareni-prezentace', 'Vytváření prezentace'),
                new Video('prace-s-textem', 'Práce s textem'),
                new Video('zmena-navrhu-prezent', 'Změna návrhu prezentace'),
                new Video('rozlozeni-snimku', 'Rozložení snímku'),
                new Video('tabulky', 'Tabulky'),
                new Video('grafy', 'Grafy'),
                new Video('prechody-a-animace', 'Přechody a animace'),
                new Video('ukladani-a-publikace', 'Ukládání a publikace'),
                new Video('revize', 'Revize'),
                new Video('powerpoint-online', 'PowerPoint Online')
            ), $janKozina),
            new Subject('hrajeme-si-s-fotografiemi', 'Hrajeme si s fotografiemi', array(
                
            ), $janKozina),
            new Subject('zpracovani-a-analyza-dat-a-tvorba-grafu', 'Zpracování a analýza dat a tvorba grafů', array(
                new Video('uvod', 'Úvod'),
                new Video('vzorce', 'Vzorce'),
                new Video('adresace', 'Adresace'),
                new Video('seznamy', 'Seznamy'),
                new Video('maticove-vzorce', 'Maticové vzorce'),
                new Video('fukce-mat-a-stat', 'Funkce mat a stat'),
                new Video('textove-funkce', 'Textové funkce'),
                new Video('funkce-datum-a-cas', 'Funkce datum a čas'),
                new Video('vytvoreni-grafu-1', 'Vytvoření grafu'),
                new Video('vytvoreni-grafu-2', 'Vytvoření grafu'),
                new Video('kontingencni-tabulka', 'Kontingenčí tabulka'),
                new Video('kontingencni-graf', 'Kontingenční graf'),
                new Video('databazove-funkce', 'Databázové funkce')
            ), 'Pampaedia servis s.r.o., Karafiátová 294/6, 778 00 Olomouc - Neředín, IČ 27816460'),
            new Subject('jak-vzdelavat-online', 'Jak vzdělávat online', array()),
            new Subject('bezpecny-internet', 'Bezpečný internet', array()),
            new Subject('i-neprogramator-zvladne-vytvorit-profesionalni-web', 'I neprogramátor zvládne vytvořit profesionální web ', array()),
        );
    }

    public function getSubjects() {
        return $this->subjects;
    }

    public function getSubjectBySlug($slug) {
        foreach ($this->subjects as $subject) {
            if ($subject->slug == $slug) {
                return $subject;
            }
        }
        throw new InvalidStateException("Unknown subject: '$slug'.");
    }

}
