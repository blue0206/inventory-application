import { ReactElement } from "react";
import { NavLink } from "react-router";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle 
} from '../ui/navigation-menu';

export default function Header(): ReactElement {
    return (
        <>
            <header className="w-full flex justify-between content-center items-center bg-white p-3.5 py-5 sticky">
                <div>
                    <nav>
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavLink to={"/"}>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
                                    </NavLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavLink to={"/trainers"}>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>Trainers</NavigationMenuLink>
                                    </NavLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavLink to={"/pokemon"}>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>Pokemon</NavigationMenuLink>
                                    </NavLink>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </nav>
                </div>
                <div>
                    
                </div>
                <div>

                </div>
            </header>
        </>
    );
}
