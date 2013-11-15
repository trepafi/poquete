<?php

namespace Poquete\APIBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Cookie;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * @Route("", name = "plans")
 *
 */
class PlansController extends Controller {

	/**
	 * @Route("/plans/", name = "get_all_plans")
	 *
	 */
    public function getAllAction() {
        $em   = $this->getDoctrine()->getEntityManager();
        $util = $this->get('Poquete.Utility');

        $plans = $em
                    ->getRepository('PoqueteAPIBundle:Plans')
                    ->findAll();

        $util->log($plans);
    	die('yeah');

        return $this->render('PoqueteAPIBundle:Default:index.html.twig', array('name' => $name));
    }
}
