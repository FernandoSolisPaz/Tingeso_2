import {useEffect, useState } from "react";
import Box from "@mui/material/Box";
import brandService from "../services/brand.service.js";
import {Link, useNavigate, useParams} from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";



const RegisterBrandBond = () => {
    const [brandName, setBrandName] = useState("");
    const [bondAvailable, setBondAvailable] = useState("");
    const [amount, setAmount] = useState("");
    const {id} = useParams();
    const navigate = useNavigate();
    const [titleBrandForm, setBrandForm]  = useState("");

    const saveBrandBond = (b) => {
        b.preventDefault();

        const brand = { brandName, bondAvailable, amount, id};
        if(id) {
            brandService
                .update(brand)
                .then((response) => {
                    console.log("Brand has been updated", response.data);
                    navigate("/car_brand/list");
                })
                .catch((error) => {
                    console.log(
                        "An error has occurred in the updating of the brand",
                        error
                    );
                });
        } else{
            brandService
                .create(brand)
                .then((response) => {
                    console.log("Brand has been registered", response.data);
                    navigate("/car_brand/list");
                })
                .catch((error) => {
                    console.log(
                        "An error has occurred in the register of the brand",
                        error
                    );
                });
        }
    };

    useEffect(() => {
        if(id){
            setBrandForm("Edit Brand");
            brandService
                .get(id)
                .then((brand) => {
                    setBrandName(brand.data.brandName);
                    setBondAvailable(brand.data.bondAvailable);
                    setAmount(brand.data.amount);
                })
                .catch((error) => {
                    console.log("An error has occurred", error);
                });
        } else {
            setBrandForm("New Brand Bond")
        }
    }, []);

    return(
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            component="form"
        >
            <h3>{titleBrandForm}</h3>
            <hr />
            <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    marginBottom: '1rem'
                }}>
                    <FormControl style={{width: '49%'}}>
                        <TextField
                            id="brandName"
                            label="Brand Name"
                            value={brandName}
                            variant="standard"
                            onChange={(b) => setBrandName(b.target.value)}
                            helperText="Ej. Toyota"
                        />
                    </FormControl>

                    <FormControl style={{width: '49%'}}>
                        <TextField
                            id="bondAvailable"
                            label="Bond Available"
                            type="number"
                            value={bondAvailable}
                            variant="standard"
                            onChange={(b) => setBondAvailable(b.target.value)}
                            helperText="Number of benefits to give"
                        />
                    </FormControl>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    marginBottom: '1rem'
                }}>
                    <FormControl style={{width: '49%'}}>
                        <TextField
                            id="amount"
                            label="Amount to give"
                            type="number"
                            value={amount}
                            variant="standard"
                            onChange={(b) => setAmount(b.target.value)}
                            helperText="Bond value to give"
                        />
                    </FormControl>
                </div>
                <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                    <FormControl>
                        <Button
                            variant="contained"
                            color="info"
                            onClick={(b) => saveBrandBond(b)}
                            style={{marginTop: '1rem'}}
                            startIcon={<SaveIcon/>}
                        >
                            Save
                        </Button>
                    </FormControl>
                </div>
            </form>
            <hr/>
            <Link to="/car_brand/list">Back to the list</Link>
        </Box>
    );
};

export default RegisterBrandBond;