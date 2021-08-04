import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TableItem from "./components/TableItem";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    marginTop: "20px",
  },
  head: {
    backgroundColor: "orange",
  },
});

function App() {
  const classes = useStyles();
  const [cheeseData, setCheeseData] = useState(); //state containing all the data
  const [search, setSearch] = useState(""); //state of the search text
  const [filtered, setFiltered] = useState(); //state containing the filtered object

  useEffect(() => {
    const url = "/canadianCheeseDirectory.json";
    axios.get(url).then((data) => {
      setCheeseData((prev) => data.data.CheeseDirectory); //get all the data and set it to state
    });
  }, []);

  useEffect(() => {
    setFiltered((prev) => cheeseData); //this initializes the filtered data once the cheesedata is recieved
  }, [cheeseData]);

  //when a search is entered, the filtered data state is updated
  useEffect(() => {
    if (cheeseData) {
      const results = cheeseData.filter((cheese) => {
        return cheese.CheeseNameEn.toLowerCase().includes(search.toLowerCase());
      });
      setFiltered((prev) => results);
    }
  }, [search]);

  //sets the search state
  const handleChange = (event) => {
    setSearch((prev) => event.target.value);
  };

  return (
    <div className="App">
      <div className="title">
        <h1>Cheeses of Canada</h1>
      </div>
      <div className="search">
        <span>Search by Name: </span>
        <input type="text" onChange={handleChange} value={search} />
      </div>
      {/* Include a button here that would switch from French to English. This would be accomplished by using a boolean state. I would pass this to the tableItem component and it would use the prop to conditionally render either french or english */}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Manufacturer</TableCell>
              <TableCell align="right">Organic</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="right">Website</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Renders a table item for each item in the filtered data */}
            {filtered &&
              filtered.map((cheese) => {
                return <TableItem data={cheese} />;
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
