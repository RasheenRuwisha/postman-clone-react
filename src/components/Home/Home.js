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

    onChange = e => {
        this.props.loadAPICALL(e.target.value)
      };
      
   


    render() {

        console.log()
        return (
            <Card
            style={{
            textAlign: "left"
        }}>



            <CardContent>
               <TextField
          label="URL"
          id="outlined-size-small"
          variant="outlined"
          size="small"
          onChange={this.onChange}
        />

<ReactJson theme="monokai" src={this.props.api} />

{
       this.props.api == undefined ? <div>{this.props.api}</div> : <div>{JSON.stringify(this.props.api)}</div>
}

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