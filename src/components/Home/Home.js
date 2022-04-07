import React, { Component, Fragment } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { loadAPICALL } from "../../actions/mainactions";
import { connect } from "react-redux";
import PropType from "prop-types";
import ReactJson from "react-json-view";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import './Home.css';
import { TextareaAutosize } from "@mui/material";


const columns = [
    { id: 'Key', label: 'Key', minWidth: 170 },
    { id: 'Value', label: 'Value', minWidth: 100 },
    {
      id: 'Description',
      label: 'Description',
      minWidth: 170,
      align: 'right',
    }
  ];

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

class Home extends Component {
  state = {
    method: "GET",
    tab: 0,
    mainTab: 0,
    url:'',
    rawData:'',
    mutual:[
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''}

        
      ],
    rows:[
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''}

        
      ],
      bodyRows:[
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''}

        
      ],
      formData:[
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''},
        {'Key': '', "Value": '', "Description": ''}

        
      ],
      page:0,
      rowsPerPage:10,
      code:'ss'

  };

  static propTypes = {
    api: PropType.object.isRequired,
    java: PropType.string.isRequired,
  };

  onChange = (e) => {
      this.setState({url:e.target.value});
  };

  handleChange = (e) => {
    this.setState({ method: e.target.value });
  };

  changeRawData = (e) => {
    this.setState({ rawData: e.target.value });
  }


  tabChange = (e, value) => {
    console.log(e.target.value);
    this.setState({ tab: value });
  };

  maintabChange = (e, value) => {
    console.log(e.target.value);
    this.setState({ mainTab: value });
  };

  submitRequest = () => {

    let url = this.state.url;
    var contentType = "application/x-www-form-urlencoded";

    var body;
    this.state.rows.map ( (row, index) => {
        if(index == 0){
            if(row.Key != ''){
               url = url + '?' + row.Key + '=' + row.Value;
            }
          }else{
            if(row.Key != ''){
               url = url + '&' + row.Key + '=' + row.Value;
            }
          }
    });

    if(this.state.rawData != ''){
        body = (this.state.rawData);
        contentType = "application/json";
    }else{
        body = {}
        this.state.bodyRows.map ( (row, index) => {
            if(row.Key != ''){
                alert(row.Key)
                body[row.Key] = row.Value;
                contentType = "application/x-www-form-urlencoded";
            }
        });

            this.state.bodyRows.map ( (row, index) => {
                if(index == 0){
                    body = {};
                }
                if(row.Key != ''){
                    alert(row.Key)
                    body[row.Key] = row.Value;
                    contentType = "application/json";
                }
    });

    }

   
    console.log(body);
    this.setCode(url,body,this.state.method,contentType)
    this.props.loadAPICALL(url,body,this.state.method,contentType);
};

setCode(url,data,contentType,method){
    var call = `var config = {
        method: ${method},
        url: ${url},
        headers: { 
          'Content-Type': ${contentType}
        },
        data : ${data}
      };

      console.log(config);

    axios(config).then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err)
        })`

      this.setState({code:<div>{call}</div>});
}



   handleChangePage = (event, newPage) => {
    this.setState({page:0 });

  };

   handleChangeRowsPerPage = (event) => {
    this.setState({ setRowsPerPage: 10,page:0 });
  };

  changeValue = (e,index,key) => {
      console.log(e.target.value);
      let rows = this.state.rows;
      rows[index][key] = e.target.value;
      console.log(rows);
      this.setState({rows:rows});
  }

  changeBodyValue = (e,index,key) => {
    console.log(e.target.value);
    let rows = this.state.bodyRows;
    rows[index][key] = e.target.value;
    console.log(rows);
    this.setState({bodyRows:rows});
}

  render() {
    console.log();
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card
              style={{
                textAlign: "left",
              }}
            >
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    <Select
                      fullWidth
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      variant="outlined"
                      size="small"
                      value={this.state.method}
                      label="Age"
                      onChange={this.handleChange}
                    >
                      <MenuItem value={"GET"}>GET</MenuItem>
                      <MenuItem value={"post"}>POST</MenuItem>
                      <MenuItem value={"DELETE"}>DELETE</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      fullWidth
                      label="URL"
                      id="outlined-size-small"
                      variant="outlined"
                      size="small"
                      onChange={this.onChange}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Button onClick={this.submitRequest} fullWidth variant="outlined" size="large">
                      Send
                    </Button>
                  </Grid>
                </Grid>

                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={this.state.mainTab}
                    onChange={this.maintabChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label="Params" {...a11yProps(0)} />
                    <Tab label="x-www-form-urlencoded" {...a11yProps(1)} />
                    <Tab label="Form Data" {...a11yProps(2)} />
                    <Tab label="Raw" {...a11yProps(3)} />

                  </Tabs>
                </Box>
                <TabPanel value={this.state.mainTab} index={0}>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.mutual
              .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
              .map((row,index) => {
                  console.log(row);
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.Key}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                            <TextField   variant="outlined" size="small" value={this.state.rows[index][column.id]} onChange={(e) => this.changeValue(e,index,column.id)}/>   
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      
    </Paper>
                </TabPanel>
                <TabPanel value={this.state.mainTab} index={1}>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.mutual
              .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
              .map((row,index) => {
                  console.log(row);
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.Key}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                            <TextField   variant="outlined" size="small" value={this.state.bodyRows[index][column.id]} onChange={(e) => this.changeBodyValue(e,index,column.id)}/>   
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      
    </Paper>
                </TabPanel>
                <TabPanel value={this.state.mainTab} index={2}>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.mutual
              .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
              .map((row,index) => {
                  console.log(row);
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.Key}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                            <TextField   variant="outlined" size="small" value={this.state.bodyRows[index][column.id]} onChange={(e) => this.changeBodyValue(e,index,column.id)}/>   
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      
    </Paper>
                </TabPanel>
                <TabPanel value={this.state.mainTab} index={3}>

                <TextField
          id="filled-multiline-static"
          fullWidth
          multiline
          rows={30} onChange={this.changeRawData} value={this.state.rawData}
          variant="filled"
        />
                </TabPanel>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={this.state.tab}
                onChange={this.tabChange}
                aria-label="basic tabs example"
              >
                <Tab label="JSON" {...a11yProps(0)} />
                <Tab label="Class Models" {...a11yProps(1)} />
                <Tab label="Example call" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={this.state.tab} index={0}>
              <ReactJson theme="monokai" src={this.props.api} />
            </TabPanel>
            <TabPanel value={this.state.tab} index={1}>
              {<div className="display-linebreak">{this.props.java}</div>}
            </TabPanel>
            <TabPanel value={this.state.tab} index={2}>
              {<div className="display-linebreak">{this.state.code}</div>}
            </TabPanel>

            <Card></Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  api: state.api,
  java: state.java,
});

export default connect(mapStateToProps, { loadAPICALL })(Home);

