import React, { Component, Fragment } from "react";
import { Autocomplete } from "./components";
import { Character } from "./components/Autocomplete/Character";
import "./App.css";

const customValueList = [
  {
    name: "ETH",
    balance: 12.3,
  },
  {
    name: "ETC",
    balance: 88.17,
  },
];

class App extends Component {
  state = {
    simpleValue: "",
    customValue: [],
    characterValue: "",
    charactersOptions: [],
  };

  componentDidMount() {
    fetch("https://rickandmortyapi.com/api/character/1,2,3,4,5,6,7,8,9,10")
      .then((result) => {
        return result.json();
      })
      .then((results) => {
        this.setState({ charactersOptions: results });
      })
      .catch((error) => {
        console.error("Something went wrong:", error.message);
      });
  }

  onChange = (type) => (option) => {
    switch (type) {
      case "custom":
        this.setState({ customValue: option });
        break;

      case "character":
        this.setState({ characterValue: option });
        break;
      default:
        this.setState({ simpleValue: option });
    }
  };

  showCustomValue = (option) => {
    const { balance } = customValueList.find(({ name }) => name === option);
    return (
      <>
        <strong>{option}</strong>
        <span>
          &nbsp;(balance <strong>{balance}</strong>)
        </span>
      </>
    );
  };

  showCharacterOption = (option) => {
    const { charactersOptions } = this.state;
    const { image } = charactersOptions.find((item) => item.name === option);
    return (
      <div className="character-option">
        {option}
        <img className="character-icon" src={image} alt={option} />
      </div>
    );
  };

  render() {
    const {
      simpleValue,
      customValue,
      characterValue,
      charactersOptions,
    } = this.state;

    const characterNames = charactersOptions.map(({ name }) => name);
    const selectedCharacter = charactersOptions.find(
      ({ name }) => name === characterValue
    );
    const customOptions = customValueList.map(({ name }) => name);

    return (
      <div className="App main-box">
        <div className="autocomplete-box">
          <span className="autocomplete-label">Simple Autocomplete</span>
          <Autocomplete
            value={simpleValue}
            options={["fillLine", "fillCircle"]}
            onChange={this.onChange("simple")}
          />

          <div className={`example-box ${simpleValue}`}>
            example text_ <strong> {simpleValue} </strong>
          </div>
        </div>

        <div className="autocomplete-box">
          <span className="autocomplete-label">Custom Autocomplete</span>
          <Autocomplete
            value={customValue}
            options={customOptions}
            onChange={this.onChange("custom")}
            showCustomValue={this.showCustomValue}
          />

          <div className="example-custom">
            Balance: 10 &nbsp; <strong>{customValue}</strong>
          </div>
        </div>

        <div className="autocomplete-box">
          <span className="autocomplete-label">Character Autocomplete</span>
          <Autocomplete
            value={characterValue}
            options={characterNames}
            onChange={this.onChange("character")}
            showCustomValue={this.showCharacterOption}
          />

          <div className="example-custom">
            {selectedCharacter && (
              <Character
                name={selectedCharacter.name}
                image={selectedCharacter.image}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
