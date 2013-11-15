<?php

namespace Poquete\APIBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Links
 *
 * @ORM\Table(name="Links")
 * @ORM\Entity
 */
class Links
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
     * @var string
     *
     * @ORM\Column(name="url", type="string", length=100, nullable=true)
     */
    private $url;

    /**
     * @var \Linktypes
     *
     * @ORM\ManyToOne(targetEntity="Linktypes")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="linktype_id", referencedColumnName="id")
     * })
     */
    private $linktype;


}
