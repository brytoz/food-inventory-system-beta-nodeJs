import { MdOutlineInventory } from 'react-icons/md'
import { FaUser } from 'react-icons/fa'
import {BiPackage } from "react-icons/bi";
import {FcMoneyTransfer } from "react-icons/fc";
import { AiFillProfile } from 'react-icons/ai';
import { CgFileDocument } from 'react-icons/cg';



export const links = [
    {id:1, title: 'Inventory', ref: "/", icon: <MdOutlineInventory size={25} />},
    {id:2, title: 'Add Products', ref: "/addInventory", icon: <BiPackage size={25} />},
    // {id:3, title: 'Delete Product', ref: "", icon: <FcMoneyTransfer size={25} />},
    {id:4, title: 'Read Me', ref: "/read", icon: <CgFileDocument color='white' size={25} />},
    {id:5, title: 'My Profile', ref: "/profile", icon: <FaUser size={25} />},
]

 