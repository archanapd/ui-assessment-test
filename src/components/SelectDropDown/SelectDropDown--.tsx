import React, { useEffect, useState } from 'react';
import './SelectDropDown.scss';

export default function SelectDropDown_t(props: any) {
  let selectedValuesArray: any = [];

  useEffect(() => {
    props.values.answers.map((answer: any, index: number) => {
      if (answer.selected) {
        setSelectedOption(index);
      }
    });
  }, [props]);

  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);
  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  const setSelectedThenCloseDropdown = (index: number) => {
    setSelectedOption(index);
    setIsOptionsOpen(false);
    selectedValuesArray[index] = props.values.answers[index];
  };

  const handleKeyDown = (index: any) => (e: any) => {
    switch (e.key) {
      case ' ':
      case 'SpaceBar':
      case 'Enter':
        e.preventDefault();
        setSelectedThenCloseDropdown(index);
        break;
      default:
        break;
    }
  };

  const handleListKeyDown = (e: any) => {
    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        setIsOptionsOpen(false);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedOption(
          selectedOption - 1 >= 0 ? selectedOption - 1 : props.values.answers.length - 1
        );
        break;
      case 'ArrowDown':
        e.preventDefault();
        setSelectedOption(
          selectedOption === props.values.answers.length - 1 ? 0 : selectedOption + 1
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className="select-wrapper">
      <div className="select-wrapper--box">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOptionsOpen}
          className={isOptionsOpen ? 'expanded' : ''}
          onClick={toggleOptions}
          id={props.values.groupId}
          value={props.values.answers[selectedOption].id}
        >
          {props.values.answers[selectedOption].content}
        </button>
        <ul
          className={`options ${isOptionsOpen ? 'show' : ''}`}
          role="listbox"
          aria-activedescendant={props.values.answers[selectedOption].content}
          tabIndex={-1}
          onKeyDown={handleListKeyDown}
        >
          {props.values.answers.map((option: any, index: any) => {
            return (
              <li
                key={index}
                id={option.id}
                role="option"
                aria-selected={selectedOption === index}
                tabIndex={0}
                onKeyDown={handleKeyDown(index)}
                onClick={() => {
                  setSelectedThenCloseDropdown(index);
                }}
              >
                {option.content}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
