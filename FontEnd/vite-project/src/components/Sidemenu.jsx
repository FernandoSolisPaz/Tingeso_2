import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ConstructionIcon from '@mui/icons-material/Construction';
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import DescriptionIcon from '@mui/icons-material/Description';

// eslint-disable-next-line react/prop-types
export default function Sidemenu({ open, toggleDrawer}){
    const navigate = useNavigate();

    const listOptions = () => (
        <Box
            role="presentation"
            onClick={toggleDrawer(false)}
        >
            <List>
                <ListItemButton onClick={() => navigate("/home")}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>

                <Divider />

                <ListItemButton onClick={() => navigate("/cars/list")}>
                    <ListItemIcon>
                        <DirectionsCarIcon />
                    </ListItemIcon>
                    <ListItemText primary="Car List" />
                </ListItemButton>
                <ListItemButton onClick={() => navigate("/car_brand/list")}>
                    <ListItemIcon>
                        <AttachMoneyIcon />
                    </ListItemIcon>
                    <ListItemText primary="Car Brand" />
                </ListItemButton>
                <ListItemButton onClick={() => navigate("/repairs/list")}>
                    <ListItemIcon>
                        <ConstructionIcon />
                    </ListItemIcon>
                    <ListItemText primary="Repair Types" />
                </ListItemButton>
                <ListItemButton onClick={() => navigate("/repair/register")}>
                    <ListItemIcon>
                        <ConstructionIcon />
                    </ListItemIcon>
                    <ListItemText primary="Register Repairs" />
                </ListItemButton>
                <ListItemButton onClick={() => navigate("/report/list")}>
                    <ListItemIcon>
                        <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary="Report" />
                </ListItemButton>
                <ListItemButton onClick={() => navigate("/receipt/list")}>
                    <ListItemIcon>
                        <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary="See All Receipts" />
                </ListItemButton>
            </List>
        </Box>
    );
   return (
       <div>
           <Drawer anchor={"left"} open={open} onClose={toggleDrawer(false)}>
               {listOptions()}
           </Drawer>
       </div>
   );
}