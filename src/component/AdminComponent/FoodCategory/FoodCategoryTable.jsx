import React, {useContext, useEffect} from 'react';
import {
    Box,
    Card,
    CardHeader,
    IconButton, Modal,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import CreateFoodCategoryForm from "./CreateFoodCategoryForm";
import {AppContext} from "../../../context/AppContext";
import {useDispatch, useSelector} from "react-redux";
import {getRestaurantCategory} from "../../../State/Restaurant/Action";
import {fetchRestaurantOrder} from "../../../State/Restaurant Order/Action";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const FoodCategoryTable = () => {

    const { jwt } = useContext(AppContext)
    const dispatch = useDispatch()
    const { usersRestaurant, categories } = useSelector((store) => store.restaurant)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        dispatch(getRestaurantCategory({jwt, restaurantId: usersRestaurant?.id}))

    }, [jwt]);

    return (
        <Box>
            <Card className='mt-1'>
                <CardHeader
                    title={"Food Category"}
                    sx={{pt:2, alignItems:"center"}}
                    action={
                        <IconButton onClick={handleOpen} aria-label="settings">
                            <CreateIcon />
                        </IconButton>
                    }
                />


                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Id</TableCell>
                                <TableCell align="left">Name</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map((item) => (
                                <TableRow
                                    key={item.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {1}
                                    </TableCell>
                                    <TableCell align="left">{item.name}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CreateFoodCategoryForm/>
                </Box>
            </Modal>
        </Box>
    );
};

export default FoodCategoryTable;
