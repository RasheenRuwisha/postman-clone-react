import React, {Component, Fragment} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { loadAPICALL } from '../../actions/mainactions';
import { connect } from 'react-redux';
import PropType from 'prop-types'
import ReactJson from 'react-json-view'

class Home extends Component {


    static propTypes = {
        api: PropType.object.isRequired,
    }

    componentDidMount() {
        this.props.loadAPICALL("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
    }


    render() {

        console.log()
        return (
            <Card
            style={{
            textAlign: "left"
        }}>

<ReactJson src={this.props.api} />


            <CardContent>
               <TextField
          label="URL"
          id="outlined-size-small"
          variant="outlined"
          size="small"
          onChange={this.onChange}
        />
            </CardContent>
        </Card>
        )
    }
}


const mapStateToProps = state => ({
    api: state.api, 
  });
  
  export default connect(
    mapStateToProps,
    { loadAPICALL}
  )(Home);