<?php

namespace BNSIR\model;

class ValidaForm {
	private function clearAll ($data) {
		return array_map(function ($info) {
			return strip_tags($info);
		}, $data);
	}

	public function validate (array $data) {
		return $this->clearAll($data);
	}
}
