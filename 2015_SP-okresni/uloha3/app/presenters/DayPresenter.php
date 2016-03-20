<?php

namespace App\Presenters;

use App\Model\Subject;
use Nette;

class DayPresenter extends BasePresenter {
	public function renderDefault($slug) {
		$next = $prev = "";
		if ($slug == "nedele") {
			$next = "pondeli";
			$prev = "sobota";
		} elseif ($slug == "pondeli") {
			$prev = "nedele";
			$next = "utery";
		} else {
			$prev = array_keys($this->days)[array_search($slug, array_keys($this->days)) - 1];
			$next = array_keys($this->days)[array_search($slug, array_keys($this->days)) + 1];
		}
		$this->template->next = $next;
		$this->template->prev = $prev;
		$this->template->day = $this->days[$slug];
	}
}
