import React, { useState, useEffect } from 'react';
import Universities from './universities';
import Navbar from './navbar';
import SearchBar from "material-ui-search-bar";
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import List from '@material-ui/core/List';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Pagination from '@material-ui/lab/Pagination';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    search: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        boxShadow: '0 7px 14px rgba(0,0,0,0.25), 0 5px 5px rgba(0,0,0,0.22)'
    },
    cardAlign: {
        display: "inline-block",
        margin: "35px",
        alignContent: "center"
    },
    button: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    flexContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    root: {
        '& > *': {
            marginTop: theme.spacing(2)
        }
    },
    PaginationContainer: {
        justifyContent: 'center'
    }

}));

export default function Home() {
    const classes = useStyles();
    const [university, setUniversity] = useState(['NoUniversity']);
    const [search, setSearch] = useState('')
    const [country, setCountry] = useState([''])
    const [page, setPage] = useState(0)
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false)
    const [showInfo, setShowInfo] = React.useState(false)
    const [value, setValue] = React.useState('')
    const [universityEdit, setUniversityEdit] = useState('')
    const [editName, setEditName] = useState('')
    const [editCountry, setEditCountry] = useState('')
    const [editDomain, setEditDomain] = useState('')
    const [editWebpage, setEditWebpage] = useState('')
    const [editAlphaCode, setEditAlphaCode] = useState('')
    let countries = []
    let countryFilter = []

    const handleEditName = (event) => {
        setEditName(event.target.value)
    }
    const handleEditCountry = (event) => {
        setEditCountry(event.target.value)
    }
    const handleEditDomain = (event) => {
        setEditDomain(event.target.value)
    }
    const handleEditWebpage = (event) => {
        setEditWebpage(event.target.value)
    }
    const handleEditAlphaCode = (event) => {
        setEditAlphaCode(event.target.value)
    }
    const handleOpen = () => {
        setOpen(true);
        let list = []
        for (let i in university) {
            list.push(university[i].country)
        }
        countries = list.filter(function (x, i, a) {
            return a.indexOf(x) === i;
        });
        setCountry(countries)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEditClose = () => {
        setOpenEdit(false)
        setUniversityEdit('')
    }

    const setUniversities = (universities) => {
        setUniversity(universities)
    }

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/university")
            .then((res) => {
                setUniversities(res.data.universities);
            }, (error) => {
                console.log('error', error)
            });
    }, []);

    function searchVal(value, page = 1) {
        setValue(value)
        axios.get("http://127.0.0.1:5000/search?name=" + value + "&page=" + page)
            .then((res) => {
                setUniversities(res.data.items);
                setPage(res.data.pages)
            }, (error) => {
                console.log('error', error)
            });
    }

    function arrayRemove(arr, value) {

        return arr.filter(function (ele) {
            return ele != value;
        });
    }

    const handleCountryFilter = (event) => {
        if (event.target.checked) {
            countryFilter.push(event.target.value)
        } else {
            countryFilter = arrayRemove(countryFilter, event.target.value)
        }
        console.log(countryFilter)
    };

    const filteredSearch = () => {
        if (countryFilter.length > 0) {
            setOpen(false);
            setShowInfo(true)
            axios.post("http://127.0.0.1:5000/search", {
                data: {
                    country: countryFilter
                }
            })
                .then((res) => {
                    console.log(res)
                    setUniversities(res.data);
                    setPage(res.data.page)
                }, (error) => {
                    console.log('error', error)
                });
        }
    }

    const resetFilters = () => {
        setShowInfo(false)
        setPage(0)
        axios.get("http://127.0.0.1:5000/university")
            .then((res) => {
                setUniversities(res.data.universities);
            }, (error) => {
                console.log('error', error)
            });
    }

    const handlePagination = (event, val) => {
        axios.get("http://127.0.0.1:5000/search?name=" + value + "&page=" + val)
            .then((res) => {
                setUniversities(res.data.items);
            }, (error) => {
                console.log('error', error)
            });
    }

    const deleteUniversity = (name) => {
        axios.delete("http://127.0.0.1:5000/university?name="+name)
            .then((res) => {
                resetFilters()
            })
        console.log(name)
    }

    const editUniversity = (name) => {
        setOpenEdit(true);
        setUniversityEdit(name)
    }

    const editUniversityData = () => {
        let editData = universityEdit
        if(editName){
            editData.name = editName
        } else if(editCountry){
            editData.country = editCountry
        } else if(editDomain){
            editData.domain = editDomain
        } else if (editAlphaCode){
            editData.alpha_two_code = editAlphaCode
        } else if (editWebpage){
            editData.webpage = editWebpage
        }
        axios.put("http://127.0.0.1:5000/university?name="+editData.name, {
            data: {
                university: editData
            }
        })
            .then((res) => {
                setOpenEdit(false)
                console.log(res)
            }, (error) => {
                console.log('error', error)
            });
    }

    const editModal = (
        <div className={classes.paper}>
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField
                        id="standard-basic"
                        label="Name"
                        defaultValue={universityEdit.name}
                        onChange={handleEditName}
                    />
                    <TextField
                        id="standard-basic"
                        label="Country"
                        defaultValue={universityEdit.country}
                        onChange={handleEditCountry}
                    />
                    <TextField
                        id="standard-basic"
                        label="Country code"
                        defaultValue={universityEdit.alpha_two_code}
                        onChange={handleEditAlphaCode}
                    />
                    <TextField
                        id="standard-basic"
                        label="Domain"
                        defaultValue={universityEdit.domain}
                        onChange={handleEditDomain}
                    />
                    <TextField
                        id="standard-basic"
                        label="Web page"
                        defaultValue={universityEdit.webpage}
                        onChange={handleEditWebpage}
                    />
                    <Button
                        variant="contained"
                        color="default"
                        size="small"
                        className={classes.button}
                        onClick= {editUniversityData}
                    >
                        Save
                    </Button>
                </div>
            </form>
        </div>
    )

    const modalBody = (
        <div className={classes.paper}>
            <List>
                <Typography className={classes.title} variant="h6" noWrap>Country</Typography>
                <FormControl component="fieldset">
                    {
                        country.map((text, index) => (
                            <FormGroup aria-label="position" row>
                                <FormControlLabel
                                    value={text}
                                    control={<Checkbox color="primary" />}
                                    label={text}
                                    labelPlacement="end"
                                    onChange={handleCountryFilter}
                                />
                            </FormGroup>
                        ))}
                </FormControl>
            </List>

            <Button
                variant="contained"
                color="default"
                size="small"
                className={classes.button}
                onClick={filteredSearch}
            >
                Apply Filters
            </Button>
        </div>
    );

    return (
        <div>
            <Navbar setUniversities={setUniversities} universities={university}></Navbar>
            <SearchBar
                value={search}
                onRequestSearch={(search) => searchVal(search)}
                onCancelSearch={() => resetFilters()}
                className={classes.search}
            />
            <Button
                variant="contained"
                color="default"
                size="small"
                className={classes.button}
                startIcon={<FilterListIcon />}
                onClick={handleOpen}
            >
                Filters
            </Button>
            <Button
                variant="contained"
                color="default"
                size="small"
                className={classes.button}
                startIcon={<CloseIcon />}
                onClick={resetFilters}
                style={{ display: showInfo ? "inline-block" : "none" }}
            >
                Reset Filters
            </Button>
            <div className={classes.flexContainer}>
                <Universities
                    universities={university}
                    editUniversity={editUniversity}
                    deleteUniversity={deleteUniversity}
                    className={classes.cardAlign} />
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className={classes.modal}
            >
                {modalBody}
            </Modal>
            <Modal
                open={openEdit}
                onClose={handleEditClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className={classes.modal}
            >
                {editModal}
            </Modal>
            <div className={classes.PaginationContainer}>
                <Pagination
                    count={page}
                    color="primary"
                    onChange={handlePagination} />
            </div>
        </div>
    )
}