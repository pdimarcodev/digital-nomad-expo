import { renderComponent } from "@/src/test-utils/renderComponent";
import { fireEvent, screen } from "@testing-library/react-native";
import { Button } from "../Button";

describe("<Button />", () => {
  it("should call onPress when pressed", () => {
    const onPressFn = jest.fn();

    renderComponent(<Button title="Button title" onPress={onPressFn} />);

    fireEvent.press(screen.getByText("Button title"));

    expect(onPressFn).toHaveBeenCalled();
  });

  it("should not call onPress when disabled", () => {
    const onPressFn = jest.fn();

    renderComponent(
      <Button title="Button title" onPress={onPressFn} disabled />,
    );

    fireEvent.press(screen.getByText("Button title"));

    expect(onPressFn).not.toHaveBeenCalled();
  });
});
