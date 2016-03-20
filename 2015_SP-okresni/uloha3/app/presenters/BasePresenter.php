<?php

namespace App\Presenters;

use App\Model\SubjectManager;
use Nette\Application\UI\Presenter;

/**
 * Base presenter for all application presenters.
 */
abstract class BasePresenter extends Presenter {
	protected $days = [
			"pondeli" => ["Pondělí", "Pondělí (zast. a nář. pondělek) je jeden ze sedmi dnů v týdnu. V českém
občanském kalendáři je pondělí první den týdne, ale v tradičním židovském a
křesťanském kalendáři je považován za den druhý. Pondělím také začíná pracovní
týden, pročež jej lidé často označují za svůj nejméně oblíbený den v
týdnu.[zdroj?]
Název pondělí pochází od názvu neděle (zkráceně  po neděli ). Stará severština
pondělí pojmenovala po Manim, bohu Měsíce. Podobně je tomu i v na latinském
základě založených jazycích, jako např. v italštině (Lunedi), francouzštině
(lundi), španělštině (Lunes) a rumunštině (Luni), což jsou názvy vycházející z
latinského výrazu pro Měsíc neboli lunu. Ruské slovo pro tento den v týdnu je
podobné jako v češtině -             (ponědělnik)."],
			"utery" => ["Úterý", "Úterý je jeden ze sedmi dnů v týdnu. V českém občanském kalendáři se počítá za
druhý den týdne, ale v tradičním židovském a křesťanském kalendáři se považuje
za den třetí.
Název dne pochází ze staročeského slova vterý, což znamená  druhý [1]. Podobně
je název druhého dne v týdnu utvořen i v některých dalších slovanských
jazycích, srovnej např. s ruským vtórnik."],
			"streda" => ["Středa","Středa je v češtině označení dne v týdnu mezi úterým a čtvrtkem. Jeho jméno
říká, že se jedná o střed týdne, což je odvozeno z pozice středy jako
prostředního, tedy čtvrtého dne týdne v tradičním židovském a křesťanském
kalendáři. V českém občanském kalendáři je středa považována za den třetí.
V křesťanství je středa vedle pátku druhým postním dnem. V byzantském ritu je
středa dnem připomínky svatého Kříže nebo Bohorodičky."],
			"ctvrtek" => ["Čtvrtek","Čtvrtek je označení pro čtvrtý den po neděli (odtud i jeho název). V českém
občanském kalendáři je považován za čtvrtý den týdne, v tradičním židovském a
křesťanském kalendáři za den pátý.
I když český název  čtvrtek  naznačuje, že týden začíná pondělkem, může se
týden počítat i od neděle; potom je čtvrtek pátým dnem v pořadí, jak vysvítá ze
středověkého latinského názvu feria quinta či z portugalského quinta-feira."],
			"patek" => ["Pátek","
Pátek je podle mezinárodní normy ISO 8601 označení pro pátý den po neděli
(odtud i jeho název). V českém občanském kalendáři je počítán za pátý den
týdne, v tradičním židovském a křesťanském kalendáři za den šestý. Ve většině
zemí posledním z pěti pracovních dní před víkendem. V některých oblastech světa
se počítá jako šestý den, protože se týden začíná nedělí. Ve většině zemí s
pětidenním pracovním týdnem je pátek také poslední pracovní den před víkendem.
V některých zemích je pátek první den víkendu a neděle je první pracovní den. V
Saúdské Arábii a Íránu je pátek poslední den víkendu (v sobotu je první
pracovní den). Tatáž situace byla v Bahrajnu, Spojených arabských emirátech a
Kuvajtu (od roku 2006 je tam pátek první den víkendu a neděle je začátek
pracovního týdne)."],
			"sobota" => ["Sobota","
Sobota je označení pro den v týdnu, který je v českém občanském kalendáři
považován za šestý, ale v tradičním židovském a křesťanském kalendáři je dnem
sedmým a posledním. Zpravidla bývá součástí víkendu, tedy dnem odpočinku. Slovo
pochází z hebrejského šabat (odpočinek)."],
			"nedele" => ["Neděle","
Neděle je jeden ze sedmi dnů v týdnu. V českém občanském kalendáři se počítá za
sedmý (tj. poslední) den týdne, ale v tradičním křesťanském a židovském
kalendáři se považuje za den první. Název dne neděle pochází od nedělati, neboť
neděle je tradičně svátkem, kdy se nepracuje."],
		];

	public function beforeRender() {
		$this->template->days = $this->days;
	}
}
