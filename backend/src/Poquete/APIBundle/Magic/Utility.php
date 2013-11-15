<?php

namespace Poquete\APIBundle\Magic;

/**
 * Class for all util methods among the app.
 *
 */
class Utility {
	/**
	 * Prints on the screen a log message between <pre> tag
	 * @param String $s    String to print
	 *
	 */
	public function log($s) {
		echo "<pre>" . print_r($s, true) . "</pre>";
	}

	/**
	 * Dumps a value passes by parameter. 
	 * Uses the var_dump function between <pre> tag
	 * @param Mixed $o 		Value to print
	 *
	 */
	public function dump($o) {
		echo "<pre>" . var_dump($o) . "</pre>";
	}

	/**
     * Converts a string in a new one slugified.
     * @param String $string 	String to slugify
     *
     */
	public function convertToFriendly($string) {
		return strtolower(trim(preg_replace('~[^0-9a-z]+~i', '-', html_entity_decode(preg_replace('~&([a-z]{1,2})(?:acute|cedil|circ|grave|lig|orn|ring|slash|th|tilde|uml);~i', '$1', htmlentities($string, ENT_QUOTES, 'UTF-8')), ENT_QUOTES, 'UTF-8')), '-'));
	}

	/**
	 * Set up an entity with the data passed into the array.
	 * @param Entity $entity 	Entity to be setted up
	 * @param Array $data		Data to fill the entity
	 * @return Entity $entity 	Entity with the data
	 *
	 */
	public function array2Entity(&$entity, $data) {
		foreach ($data as $k => $v) {
			$method =  sprintf('set%s', ucwords($k));
			$entity->$method($v);
		}
		return $entity;
	}

	/**
	 * Sorts an multidimensional array taking as reference $on key
	 * @param  Array $array 	Array to be sorted
	 * @param  Mixed $on 		String or integer that indicates the key to sort
	 * @param  Integer $order 	Type of sorting
	 * @return Array $new_array Sorted array
	 *
	 */
	public function array_sort($array, $on, $order = SORT_ASC) {
	    $new_array = array();
	    $sortable_array = array();
	    if (count($array) > 0) {
	        foreach ($array as $k => $v) {
	            if (is_array($v)) {
	                foreach ($v as $k2 => $v2) {
	                    if ($k2 == $on) {
	                        $sortable_array[$k] = $v2;
	                    }
	                }
	            }
	            else {
	                $sortable_array[$k] = $v;
	            }
	        }

	        switch ($order) {
	            case SORT_ASC:
	                asort($sortable_array);
	            	break;
	            case SORT_DESC:
	                arsort($sortable_array);
	            	break;
	        }

	        foreach ($sortable_array as $k => $v) {
	            $new_array[$k] = $array[$k];
	        }
	    }

	    return $new_array;
	}

	/**
	 * Calculates the distance between two coordinates
	 * It could be shown in miles or km
	 * @param
	 * @param
	 * @return
	 *
	 */
	public function distance($lat1, $lng1, $lat2, $lng2, $miles = false) {
		$pi80 = M_PI / 180;
		$lat1 *= $pi80;
		$lng1 *= $pi80;
		$lat2 *= $pi80;
		$lng2 *= $pi80;

		$r = 6372.797; // mean radius of Earth in km
		$dlat = $lat2 - $lat1;
		$dlng = $lng2 - $lng1;
		$a = sin($dlat / 2) * sin($dlat / 2) + cos($lat1) * cos($lat2) * sin($dlng / 2) * sin($dlng / 2);
		$c = 2 * atan2(sqrt($a), sqrt(1 - $a));
		$km = $r * $c;

		return ($miles ? ($km * 0.621371192) : $km);
	}

}
?>