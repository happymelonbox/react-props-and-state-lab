import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  changeFilters = (event) => {
    this.setState({
      filters: {type: event.target.value
      }
    })
  }

  fetchPets = () => {
    const filter = this.state.filters.type
    const query = '?type='+filter
    const fetchURL = '/api/pets'
    let request
    filter !== 'all' ? request = `${fetchURL}${query}` : request = fetchURL;

    fetch(request, {method: 'GET'})
    .then(resp=>resp.json())
    .then(data=>{
      this.setState({
        pets: data
      })
      console.log(this.state.pets)
    })
  }

  adoptAPet = petId =>{
    const adoptedPets = this.state.pets.map(pet=> {
      return pet.id === petId ?  {...pet, isAdopted: true} : pet
    })
    this.setState({
      pets: adoptedPets
    })
  }


  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.changeFilters} onFindPetsClick={this.fetchPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.adoptAPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
