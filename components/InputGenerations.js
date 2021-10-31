import {
  Button,
  Checkbox,
  Radio,
  Rating,
  Select,
  Slider,
  Stack,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import Box from "@mui/material/Box";
import style from "./InputGenerations.module.css";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";

const inputEnum = {
  button: 0,
  checkbox: 1,
  radio: 2,
  rating: 3,
  select: 4,
  slider: 5,
  switch: 6,
  text: 7,
  toggle: 8,
};

function getInputWidget(inputEnum) {
  switch (inputEnum) {
    case 0:
      return <Button variant="contained">Default Button</Button>;
    case 1:
      return <Checkbox />;
    case 2:
      return <Radio />;
    case 3:
      return <Rating />;
    case 4:
      return <Select />;
    case 5:
      return <Slider />;
    case 6:
      return <Switch />;
    case 7:
      return <TextField />;
    case 8:
      return (
        <ToggleButtonGroup>
          <ToggleButton value="A">A</ToggleButton>
          <ToggleButton value="B">B</ToggleButton>
          <ToggleButton value="C">C</ToggleButton>
        </ToggleButtonGroup>
      );
    default:
      break;
  }
}

export default function InputGenerations() {
  let demoWidgetsList = [
    {
      key: 0,
      inputEnum: 1,
    },
    {
      key: 1,
      inputEnum: 5,
    },
    {
      key: 2,
      inputEnum: 8,
    },
  ];

  const [widgetsList, setWidgetList] = React.useState(demoWidgetsList);
  const [maxId, setMaxId] = React.useState(3);

  function addDefaultWidget() {
    setWidgetList([...widgetsList, { key: maxId, inputEnum: 0 }]);
    setMaxId(maxId + 1);
  }

  function InputSelection(props) {
    return (
      <div>
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Input Widget Type
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={props.inputEnum}
            onChange={(event) => {
              let temp = widgetsList;
              for (let item of widgetsList) {
                if (item.key === props.key) {
                  item.inputEnum = event.target.value;
                }
              }
              setWidgetList([...temp]);
            }}
            autoWidth
            label="Input Widget Type"
          >
            {Object.keys(inputEnum).map((item) => (
              <MenuItem key={inputEnum[item]} value={inputEnum[item]}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }

  function inputRow(props) {
    return (
      <Stack direction="row" spacing={3} sx={{ margin: "15px" }}>
        {getInputWidget(props.inputEnum)}
        {InputSelection(props)}
        <IconButton
          onClick={() => {
            let _;
            for (let i = 0; i < widgetsList.length; i++) {
              let item = widgetsList[i];
              if (item.key === props.key) {
                _ = i;
                break;
              }
            }
            setWidgetList([
              ...widgetsList.slice(0, _),
              ...widgetsList.slice(_ + 1),
            ]);
          }}
        >
          <CheckIcon sx={{ color: "green" }} />
        </IconButton>
        <IconButton
          onClick={() => {
            let _;
            for (let i = 0; i < widgetsList.length; i++) {
              let item = widgetsList[i];
              if (item.key === props.key) {
                _ = i;
                break;
              }
            }
            setWidgetList([
              ...widgetsList.slice(0, _),
              ...widgetsList.slice(_ + 1),
            ]);
          }}
        >
          <CancelIcon sx={{ color: "red" }} />
        </IconButton>
      </Stack>
    );
  }

  return (
    <Box>
      <Box className={style.panel} maxHeight="75vh">
        {widgetsList.map((item) =>
          inputRow({ inputEnum: item.inputEnum, key: item.key })
        )}
      </Box>
      <Stack
        sx={{ width: "90%", position: "fixed", bottom: "10vh" }}
        direction="row"
      >
        <Box sx={{ flex: 1 }}></Box>
        <Box>
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => addDefaultWidget()}
          >
            <AddIcon />
          </Fab>
        </Box>
      </Stack>
    </Box>
  );
}
