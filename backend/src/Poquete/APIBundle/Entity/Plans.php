<?php

namespace Poquete\APIBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Plans
 *
 * @ORM\Table(name="Plans")
 * @ORM\Entity
 */
class Plans
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
     * @ORM\Column(name="title", type="string", length=100, nullable=true)
     */
    private $title;

    /**
     * @var string
     *
     * @ORM\Column(name="friendly", type="string", length=100, nullable=true)
     */
    private $friendly;

    /**
     * @var integer
     *
     * @ORM\Column(name="score", type="integer", nullable=true)
     */
    private $score;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="timestamp", type="date", nullable=true)
     */
    private $timestamp;

    /**
     * @var float
     *
     * @ORM\Column(name="price", type="decimal", nullable=true)
     */
    private $price;

    /**
     * @var integer
     *
     * @ORM\Column(name="vacancies", type="integer", nullable=true)
     */
    private $vacancies;

    /**
     * @var string
     *
     * @ORM\Column(name="location", type="string", length=100, nullable=true)
     */
    private $location;

    /**
     * @var string
     *
     * @ORM\Column(name="coordinates", type="string", length=100, nullable=true)
     */
    private $coordinates;

    /**
     * @var string
     *
     * @ORM\Column(name="meet_point_location", type="string", length=100, nullable=true)
     */
    private $meetPointLocation;

    /**
     * @var string
     *
     * @ORM\Column(name="meet_point_coordinates", type="string", length=100, nullable=true)
     */
    private $meetPointCoordinates;

    /**
     * @var string
     *
     * @ORM\Column(name="observations", type="string", length=1000, nullable=true)
     */
    private $observations;

    /**
     * @var string
     *
     * @ORM\Column(name="descriptions", type="string", length=1000, nullable=true)
     */
    private $descriptions;

    /**
     * @var string
     *
     * @ORM\Column(name="type_privacy", type="string", length=10, nullable=true)
     */
    private $typePrivacy;


}
