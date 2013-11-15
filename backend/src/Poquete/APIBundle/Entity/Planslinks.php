<?php

namespace Poquete\APIBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Planslinks
 *
 * @ORM\Table(name="PlansLinks")
 * @ORM\Entity
 */
class Planslinks
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var \Links
     *
     * @ORM\ManyToOne(targetEntity="Links")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="link_id", referencedColumnName="id")
     * })
     */
    private $link;

    /**
     * @var \Plans
     *
     * @ORM\ManyToOne(targetEntity="Plans")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="plan_id", referencedColumnName="id")
     * })
     */
    private $plan;


}
