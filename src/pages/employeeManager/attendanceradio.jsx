import {
  Radio,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";

export function RadioHorizontalList() {
  return (
    <List className="flex-row justify-evenly">
      <ListItem className="p-0">
        <label
          htmlFor="horizontal-list-react"
          className="flex w-full cursor-pointer items-center px-3 py-2"
        >
          <ListItemPrefix className="mr-3">
            <Radio
              name="horizontal-list"
              id="horizontal-list-react"
              ripple={false}
              className="hover:before:opacity-0"
              containerProps={{
                className: "p-0",
              }}
            />
          </ListItemPrefix>
          <Typography
            color="blue-gray"
            className="font-medium text-blue-gray-400"
          >
            All
          </Typography>
        </label>
      </ListItem>
      <ListItem className="p-0">
        <label
          htmlFor="horizontal-list-vue"
          className="flex w-full cursor-pointer items-center px-3 py-2"
        >
          <ListItemPrefix className="mr-3">
            <Radio
              name="horizontal-list"
              id="horizontal-list-vue"
              ripple={false}
              className="hover:before:opacity-0"
              containerProps={{
                className: "p-0",
              }}
            />
          </ListItemPrefix>
          <Typography
            color="blue-gray"
            className="font-medium text-blue-gray-400 w-max"
          >
            Present
          </Typography>
        </label>
      </ListItem>
      <ListItem className="p-0">
        <label
          htmlFor="horizontal-list-svelte"
          className="flex w-full cursor-pointer items-center px-3 py-2"
        >
          <ListItemPrefix className="mr-3">
            <Radio
              name="horizontal-list"
              id="horizontal-list-svelte"
              ripple={false}
              className="hover:before:opacity-0"
              containerProps={{
                className: "p-0",
              }}
            />
          </ListItemPrefix>
          <Typography
            color="blue-gray"
            className="font-medium text-blue-gray-400 w-max"
          >
            Half - Day
          </Typography>
        </label>
      </ListItem>
      <ListItem className="p-0">
        <label
          htmlFor="horizontal-list-svelte"
          className="flex w-full cursor-pointer items-center px-3 py-2"
        >
          <ListItemPrefix className="mr-3">
            <Radio
              name="horizontal-list"
              id="horizontal-list-svelte"
              ripple={false}
              className="hover:before:opacity-0"
              containerProps={{
                className: "p-0",
              }}
            />
          </ListItemPrefix>
          <Typography
            color="blue-gray"
            className="font-medium text-blue-gray-400"
          >
            Absent
          </Typography>
        </label>
      </ListItem>
    </List>
  );
}