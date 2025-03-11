import { ReactElement } from "react";
import { NavLink } from "react-router";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle, 
} from '../ui/navigation-menu';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../ui/dropdown-menu";

export default function Header(): ReactElement {
    return (
        <>
            <header className="w-full flex justify-between content-center items-center border-accent border-b-2 p-4 py-5 sticky text-md">
                <div>
                    <nav>
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavLink to={"/"}>
                                        <NavigationMenuLink className={`${navigationMenuTriggerStyle()} text-md cursor-pointer`}>Home</NavigationMenuLink>
                                    </NavLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavLink to={"/trainers"}>
                                        <NavigationMenuLink className={`${navigationMenuTriggerStyle()} text-md cursor-pointer`}>Trainers</NavigationMenuLink>
                                    </NavLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavLink to={"/pokemon"}>
                                        <NavigationMenuLink className={`${navigationMenuTriggerStyle()} text-md cursor-pointer`}>Pokemon</NavigationMenuLink>
                                    </NavLink>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </nav>
                </div>
                <div className="pr-3.5">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="cursor-pointer">Create</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <NavLink to={"/trainer-form"}>Trainer</NavLink>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <NavLink to={"/pokemon-form"}>Pokemon</NavLink>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
        </>
    );
}
