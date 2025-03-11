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
import { navigationService } from "../../utils/navigation";

export default function Header(): ReactElement {
    const handleNavigation = (path: string) => {
        navigationService.navigate(path);
    }

    return (
        <>
            <header className="w-full flex justify-between content-center items-center border-accent border-b-2 p-4 py-5 sticky text-md">
                <div>
                    <nav>
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>                            
                                    <NavigationMenuLink onClick={() => handleNavigation("/")} className={`${navigationMenuTriggerStyle()} text-md cursor-pointer`}>Home</NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink onClick={() => handleNavigation("/trainers")} className={`${navigationMenuTriggerStyle()} text-md cursor-pointer`}>Trainers</NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink onClick={() => handleNavigation("/pokemon")} className={`${navigationMenuTriggerStyle()} text-md cursor-pointer`}>Pokemon</NavigationMenuLink>
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
