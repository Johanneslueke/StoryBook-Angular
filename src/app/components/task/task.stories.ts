import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';

// import the actual component we like to write a story about:
import { TaskComponent } from './task.component'

/**
 * Default export describes the Component we like to write a story
 * about. Export contains the Angular Component, a title within 
 * the Storybook, and a list/regex describing what files are not 
 * considered stories.
 */
export default {
    component: TaskComponent,
    decorators: [
        moduleMetadata({
            declarations: [TaskComponent],
            imports: [CommonModule]
        }),
    ],
    excludeStories: /.*Data$/,
    title: "Task",
} as Meta;

export const actionData = {
    onPinTask: action(
        'onPinTask',
    ),
    onArchiveTask: action(
        'onArchiveTask'
    ),
};

/**
 * Generalised Story. Reason:
 * As we have multiple permutation of a component,
 * it is necessary to assign it to a Template.
 * 
 * Why:
 * Introducing the template pattern reduces the amoung
 * of code you need to write and maintain.
 * 
 * How to Apply:
 *     const some_permutation = Template.bind({});
 * Template.bind({}) create a copy of a function
 * 
 * @param args - allow a story to live edit components with the controls addon without restarting Storybook
 * @returns 
 */
const Template: Story<TaskComponent> = args => ({
    props: {
        ...args,
        onPinTask: actionData.onPinTask,
        onArchiveTask: actionData.onArchiveTask,
    },
});

/**
 * Concrete Permutation:
 * Default story with one data entry, 
 * describing a default state
 */
export const Default = Template.bind({});
Default.args = {
    task: {
        id: '1',
        title: 'test task',
        state: 'TASK_INBOX',
        updateAt: new Date(2021,0,1,9,0),
    },
};

/**
 * Concrete Permutation:
 * Another story describing data for a pinned task
 */
export const Pinned = Template.bind({});
Pinned.args = {
    task: {
        ...Default.args.task,
        state: 'TASK_PINNED'
    }
}

/**
 * Concrete Permuation:
 * Yet another story describing data for an archived task
 */
export const Archvied = Template.bind({});
Archvied.args = {
    task: {
        ...Default.args.task,
        state: 'TASK_ARCHIVED'
    }
}