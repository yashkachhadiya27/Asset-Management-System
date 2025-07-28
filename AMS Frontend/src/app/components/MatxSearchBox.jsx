import { useState, Fragment } from "react";
import {
  Icon,
  IconButton,
  styled,
  Box,
  TextField,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import axios from "axios"; // Import Axios
import { BASE_URL } from "envConfig";
import { topBarHeight } from "app/utils/constant";

// STYLED COMPONENTS
const SearchContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 9,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "auto",
  paddingTop: "10px",
  background: theme.palette.primary.main,
  color: theme.palette.text.primary,
}));

const FilterContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  marginTop: "10px",
  flexDirection: "row", // Set to row for horizontal alignment
  justifyContent: "center", // Center horizontally
  width: "100%",
}));

const TableWrapper = styled(TableContainer)(({ theme }) => ({
  maxHeight: 400, // Set a max height for scrolling
  overflowY: 'auto', // Enable vertical scrolling
  marginTop: theme.spacing(2), // Add top margin
}));

export default function MatxSearchBox() {
  const [open, setOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("");
  const [ram, setRam] = useState("");
  const [year, setYear] = useState("");
  const [hdd, setHdd] = useState("");
  const [ssd, setSsd] = useState("");

  // New states for products, loading state, and no products found message
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noProductsMessage, setNoProductsMessage] = useState(""); // New state for message

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Number of rows per page

  const toggle = () => setOpen(!open);

  const handleFilterClick = (filter) => {
    setActiveFilter(activeFilter === filter ? "" : filter);
  };

  // const handleSearch = async () => {
  //   try {
  //     setLoading(true);
  //     setNoProductsMessage(""); // Reset the message and products on new search
  //     setProducts([]); // Clear previous products

  //     const token = localStorage.getItem("token");
  //     console.log("Token retrieved:", token);

  //     if (!token) {
  //       console.error("No token found in local storage");
  //       setLoading(false);
  //       return;
  //     }

  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     };

  //     console.log("Making request to API with params:", {
  //       ram,
  //       purchaseYear: year,
  //       ssd,
  //       hdd,
  //     });

  //     const response = await axios.get(
  //       `${BASE_URL}/product/filterproducts`,
  //       {
  //         params: {
  //           ram,
  //           purchaseYear: year,
  //           ssd,
  //           hdd,
  //         },
  //         ...config
  //       }
  //     );

  //     console.log("API Response:", response.data);
  //     if (response.data.products && response.data.products.length > 0) {
  //       setProducts(response.data.products);
  //     } else {
  //       setNoProductsMessage("No products found for the selected criteria."); // Set message if no products found

  //     }

  //     setRam("");
  //     setYear("");
  //     setHdd("");
  //     setSsd("");
  //   } catch (error) {
  //     if (error.response) {
  //       console.error("Error fetching products:", error.response.data);
  //     } else {
  //       console.error("Error fetching products:", error.message);
  //     }
  //     setNoProductsMessage("No products found with the specified filters.");
  //     setRam("");
  //     setYear("");
  //     setHdd("");
  //     setSsd("");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSearch = async () => {
    try {
      setLoading(true);
      setNoProductsMessage(""); // Reset the message and products on new search
      setProducts([]); // Clear previous products

      const token = localStorage.getItem("token");
      console.log("Token retrieved:", token);

      if (!token) {
        console.error("No token found in local storage");
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      console.log("Making request to API with params:", {
        ram,
        purchaseYear: year,
        ssd: ssd ? `${ssd}GB` : undefined,
        hdd: hdd ? `${hdd}GB` : undefined, 
      });

      const response = await axios.get(
        `${BASE_URL}/product/filterproducts`,
        {
          params: {
            ram,
            purchaseYear: year,
            ssd: ssd ? `${ssd}GB` : undefined, // Append "GB" to ssd
            hdd: hdd ? `${hdd}GB` : undefined, // Append "GB" to hdd
          },
          ...config
        }
      );

      console.log("API Response:", response.data);
      if (response.data.products && response.data.products.length > 0) {
        setProducts(response.data.products);
      } else {
        setNoProductsMessage("No products found for the selected criteria."); // Set message if no products found
      }

      setRam("");
      setYear("");
      setHdd("");
      setSsd("");
    } catch (error) {
      if (error.response) {
        console.error("Error fetching products:", error.response.data);
      } else {
        console.error("Error fetching products:", error.message);
      }
      setNoProductsMessage("No products found with the specified filters.");
      setRam("");
      setYear("");
      setHdd("");
      setSsd("");
    } finally {
      setLoading(false);
    }
  };



  // Handle pagination changes
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  return (
    <Fragment>
      {!open && (
        <IconButton onClick={toggle}>
          <Icon sx={{ color: "text.primary" }}>search</Icon>
        </IconButton>
      )}

      {open && (
        <SearchContainer>
          <FilterContainer>
            {/* Filter for RAM */}
            <Button variant="contained" onClick={() => handleFilterClick("ram")} sx={{ width: "auto" }}>
              {activeFilter === "ram" ? "Select RAM" : "RAM"}
            </Button>
            {activeFilter === "ram" && (
              <TextField
                select
                label="RAM"
                value={ram}
                onChange={(e) => setRam(e.target.value)}
                variant="outlined"
                size="small"
                sx={{ minWidth: "150px", mt: 1 }}
              >
                <MenuItem value="4GB">4GB</MenuItem>
                <MenuItem value="8GB">8GB</MenuItem>
                <MenuItem value="16GB">16GB</MenuItem>
                <MenuItem value="32GB">32GB</MenuItem>
              </TextField>
            )}

            {/* Filter for Year */}
            <Button variant="contained" onClick={() => handleFilterClick("year")} sx={{ width: "auto" }}>
              {activeFilter === "year" ? "Enter Year" : "Year"}
            </Button>
            {activeFilter === "year" && (
              <TextField
                label="Year"
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                InputProps={{ inputProps: { min: 1990, max: new Date().getFullYear() } }}
                variant="outlined"
                size="small"
                sx={{ minWidth: "150px", mt: 1 }}
              />
            )}

            {/* Filter for HDD */}
            <Button variant="contained" onClick={() => handleFilterClick("hdd")} sx={{ width: "auto" }}>
              {activeFilter === "hdd" ? "Enter HDD" : "HDD"}
            </Button>
            {activeFilter === "hdd" && (
              <TextField
                label="HDD"
                type="number"
                value={hdd}
                onChange={(e) => setHdd(e.target.value)}
                InputProps={{ inputProps: { min: 0 } }}
                variant="outlined"
                size="small"
                sx={{ minWidth: "150px", mt: 1 }}
              />
            )}

            {/* Filter for SSD */}
            <Button variant="contained" onClick={() => handleFilterClick("ssd")} sx={{ width: "auto" }}>
              {activeFilter === "ssd" ? "Enter SSD" : "SSD"}
            </Button>
            {activeFilter === "ssd" && (
              <TextField
                label="SSD"
                type="number"
                value={ssd}
                onChange={(e) => setSsd(e.target.value)}
                InputProps={{ inputProps: { min: 0 } }}
                variant="outlined"
                size="small"
                sx={{ minWidth: "150px", mt: 1 }}
              />
            )}
          </FilterContainer>

          <Button variant="contained" color="secondary" onClick={handleSearch} sx={{ mt: 2 }}>
            Search
          </Button>

          <IconButton onClick={toggle} sx={{ mx: 2, verticalAlign: "middle", mt: 1 }}>
            <Icon sx={{ color: "text.primary" }}>close</Icon>
          </IconButton>

          {loading && <div>Loading...</div>}

          {noProductsMessage && <div>{noProductsMessage}</div>} {/* Show message if no products found */}

          {products.length > 0 && (
            <TableWrapper component={Paper}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ paddingLeft: "20px" }}>Product Name</TableCell>
                    <TableCell>RAM</TableCell>
                    <TableCell>HDD</TableCell>
                    <TableCell>SSD</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Year</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((product) => (
                      <TableRow key={product.id}>
                        <TableCell sx={{ paddingLeft: "20px" }}>{product.productName}</TableCell>
                        <TableCell>{product.ram}</TableCell>
                        <TableCell>{product.hdd}</TableCell>
                        <TableCell>{product.ssd}</TableCell>
                        <TableCell>{product.location}</TableCell>
                        <TableCell>{product.purchaseYear}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableWrapper>
          )}

          {products.length > 0 && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={products.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </SearchContainer>
      )}
    </Fragment>
  );
}
