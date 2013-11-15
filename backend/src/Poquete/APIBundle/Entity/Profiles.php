<?php

namespace Poquete\APIBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Profiles
 *
 * @ORM\Table(name="Profiles")
 * @ORM\Entity
 */
class Profiles
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
     * @ORM\Column(name="name", type="string", length=100, nullable=true)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="lastname", type="string", length=100, nullable=true)
     */
    private $lastname;

    /**
     * @var integer
     *
     * @ORM\Column(name="genre", type="integer", nullable=true)
     */
    private $genre;

    /**
     * @var string
     *
     * @ORM\Column(name="coordinates", type="string", length=100, nullable=true)
     */
    private $coordinates;

    /**
     * @var string
     *
     * @ORM\Column(name="city", type="string", length=100, nullable=true)
     */
    private $city;

    /**
     * @var string
     *
     * @ORM\Column(name="country", type="string", length=100, nullable=true)
     */
    private $country;

    /**
     * @var string
     *
     * @ORM\Column(name="nationality", type="string", length=100, nullable=true)
     */
    private $nationality;

    /**
     * @var string
     *
     * @ORM\Column(name="birth_date", type="string", length=100, nullable=true)
     */
    private $birthDate;

    /**
     * @var string
     *
     * @ORM\Column(name="civil_status", type="string", length=100, nullable=true)
     */
    private $civilStatus;

    /**
     * @var string
     *
     * @ORM\Column(name="social_interesting", type="string", length=100, nullable=true)
     */
    private $socialInteresting;

    /**
     * @var \Users
     *
     * @ORM\ManyToOne(targetEntity="Users")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     * })
     */
    private $user;


}
