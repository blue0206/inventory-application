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
import ThemeToggle from "../ThemeToggle";
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
                                    <NavigationMenuLink onClick={() => handleNavigation("/pokemon")} className={`${navigationMenuTriggerStyle()} text-md cursor-pointer`}>Pokémon</NavigationMenuLink>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </nav>
                </div>
                <div className="pr-3.5 flex gap-1.5 sm:gap-8 justify-center items-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="cursor-pointer">Create</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <NavLink to={"/trainer-form"} className="w-full">Trainer</NavLink>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <NavLink to={"/pokemon-form"} className="w-full">Pokemon</NavLink>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <ThemeToggle />
                </div>
            </header>
        </>
    );
}
