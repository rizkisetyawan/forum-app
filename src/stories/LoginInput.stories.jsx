/* eslint-disable storybook/story-exports */
import LoginInput from '../components/LoginInput';

const stories = {
  title: 'LoginInput',
  component: LoginInput,
  tags: ['autodocs']
};

function TemplateStory(args) {
  return <LoginInput {...args} />;
}

const Default = TemplateStory.bind({});
Default.args = {
  onLogin: () => {},
  variantTextInput: 'default',
  variantButton: 'filled'
};

export { Default };

export default stories;
