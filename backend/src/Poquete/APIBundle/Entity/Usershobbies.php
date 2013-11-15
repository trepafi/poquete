<?php

namespace Poquete\APIBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Usershobbies
 *
 * @ORM\Table(name="UsersHobbies")
 * @ORM\Entity
 */
class Usershobbies
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
     * @ORM\Column(name="value", type="string", length=100, nullable=true)
     */
    private $value;

    /**
     * @var \Hobbies
     *
     * @ORM\ManyToOne(targetEntity="Hobbies")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="hobbie_id", referencedColumnName="id")
     * })
     */
    private $hobbie;

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
