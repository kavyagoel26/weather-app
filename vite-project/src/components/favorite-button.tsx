import { WeatherData } from "@/api/types";
import { Star } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useFavorite } from "@/hooks/use-favorite";


interface FavoriteButtonProps {
    data: WeatherData;
}

const FavoriteButton = ({data} : FavoriteButtonProps) =>{
    const {addFavorite, isFavorite, removeFavorite} = useFavorite();
    const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon);

    const handleToogleFavorite = () =>{
        if(isCurrentlyFavorite){
            removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
            toast.error(`Removed ${data.name} from favorites`);
        }else{
            addFavorite.mutate({
                name: data.name,
                lat: data.coord.lat,
                lon: data.coord.lon,
                country: data.sys.country,
            });
            toast.success(`Added ${data.name} from Favorites`);
        }
    };
    return (
        <Button 
        variant = {isCurrentlyFavorite ? "default" : "outline"}
        size={"icon"}
        onClick={handleToogleFavorite}
        className={isCurrentlyFavorite ? "bg-yellow-500 hover:hg-yellow-600" : ""}>
         
<Star className={`h-4 w-4 ${isCurrentlyFavorite ? "fill-current" : ""}`}
/>
        </Button>
    )
}

export default FavoriteButton;