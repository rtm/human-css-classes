MORASS
======

Morass is a More Obvious, Reasonable Approach to Style Sheets.

Summary
-------

Morass provides **micro-classes** which make HTML files more semantic and readable,
while also reducing or even eliminating the need for complex CSS rules.
The great majority of common styling needs can be met by a suitable combination of micro-classes.

Our key design objective was to reduce CSS sprawl.
With Morass, many pages may need no specific CSS rules whatsoever.

Where the provided micro-classes don't get the job done,
Morass provides the conceptual framework for writing your own micro-classes.

In the micro-class philosophy, elements are styled withi HTML by addition micro classes, such as

    <div class="x-large padding">

To create a div with extra-large text, and padding around it.

Morass provides an easy interface to using flexbox,
removing the need for the baroque grid systems some frameworks and libraries try to provide.
For instance, the classic `float: right` is written as

    <div class="flex justify">
      <div>I'm on the left</div>
      <div>I'm on the right</div>
    </div>

Background and Motivation
-------------------------

Our current CSS systems are a steaming pile of crap.
We have thousands of lines of CSS.
Half of these lines of CSS are not even used,
because no one can remember what they do and are afraid to touch them.
Most of the rest is redundant, verbose, and duplicative.

Because CSS systems are most often created by "UI designers", rather than engineers,
basic computing principles of orthogonality and composition are ignored.

We have developed an addiction to CSS preprocessors which
merely provide some basic syntactic sugar, and, more perniciously,
promote bad design practices.
Huge sets of rules with complex selectors bog down the browser.

Each new page we write requires dozens or hundreds of new lines of CSS.
Any UI change requires parallel changes to both HTML and CSS.
We use CSS in a way which results in inconsistent UIs.
We rewrite CSS over and over, since there is no way to re-use what we have done.
There is no reasonable way to understand the CSS, or convince ourselves that it is correct, or test it.

In a futile attempt to escape this maze, we bring in monstrously large, over-engineered
frameworks such as Bootstrap, which add a massive surface area of new classes to learn and deal with.
Just as jQuery attempts to solve JavaScript problems which no longer need solving,
Bootstrap attempts to solve styling problems which no longer need solving,
in particular its cumbersome and confusing grid system.
In addition to added complexity for the programmer, these massive frameworks slow down
build times, page loading times, and rendering times.
They also make undue use of obsolete CSS features such as floats,
while failing to support modern CSS features such as flexbox.

As we proliferate these obese classes, we soon run into namespacing problems.
Names conflict with each other, and we end up needing weird namespace solutions which call for
classes with names like `Book__chapter--title`.
Then we start relying on preprocessors to handle these over-named classes,
which "help" us by allowing us to write weird-looking rules such as

    .Book {
      &__chapter {
        &--title {
          text-align: center;
          }
        }
     }


Design Principles And Features
------------------------------

### Micro-classes

Morass is a collection of micro-classes: CSS classes which often define no more than one property.
These classes are assigned to HTML elements, which in this approach may have two or five or even ten classes.
**We are moving the styling logic back into the HTML!**
The styling in the HTML becomes semnatic and readable.
Instead of having a class "book-list-entry" which contains 20 properties over in some distant CSS file,
we add three or four classes to HTML which clearly identify the styling behavior of the entry.
In the best case, which is readily realizable in practice, no element-specific class is necessary at all.

In cases where the provided micro-classes do not or can not provide the functionality you need,
such as box shadows perhaps,
we recommend defining your own generic micro-classes,
hopefully following the Morass design principles.


### Performance

CSS is rarely the major bottleneck in application performance.
Of course there may be exceptions involving huge systems,
or poorly written CSS rules,
or use of CSS properites with known performance implications.

Morass offers improved performance because the dozens or hundreds of CSS files often seen in
poorly-engineered applications are much smaller (or not needed at all).
This reduces both download and processing time.

### Floats

Morass does not use or support floats, and neither should you.

### Colors

In order to conform to the micro-class principle,
Morass defines five standard colors: primary, secondary, success, error, and warn.
Each color is itself a micro-class which sets that as the foreground color.
Variants such as `bg-success` and `border-success` apply the color to backgrounds and borders.
An `invert` micro-class swaps light and dark, so we can write

    <div class="primary bg-primary invert">Light on dark</div>

These colors are exposed as hues in an HSL model,
in the form of variables named `--hue-success`,
for use in building your own colors based on them.

### `!important`

Morass neither needs nor uses `!important`, and we recommend you do not either.

### Inline styles

Some element-specific styling can obviously not be handled with micro-classes,
`background-image` for example.
If a page has only one or two such cases, we suggest inlining the rule with the `style` attribute.
We are not religious zealots, and this can be a better approach than creating a separate CSS file
and defining an additional class merely in order to target the element.

### Composability

Of course if I want to define my own class for an alement, and add padding, I can do

    <div class="padding my-class">

and this might be the best approach.
However, what if I want to **include** the `padding` functionality into my own class definition?
We would caution against this approach, which goes against the grain of the micro-class philosophy.
However, it does have the "advantage" of allowing me to simply say `<div class="my-class">`.
SuitCSS/rework provide the ability to do this using the `rework-inherit` plug-in, which provides an `inherit` pseudo-property, as follows:

```
.myclass {
  color: red;
  inherit: .padding;
}
```

If you really want to go this route, you'll have to make sure to add `rework-inherit` to your package,
and arrange for it to be added to the list of rework plug-ins used in the preprocessing step.
Core Morass does not make use of `inherit`.

Micro-class groupings
---------------------

This section walks through each of the main groupings of micro-classes.

### Spacing

Some large proportion of CSS rules control spacing.
People use top margins and bottom margins and top padding and bottom padding and special spacing elements.
Morass provides simple mechanisms for controlling spacing.
The `spaced` micro-class adds space between child elements.
The `padding` micro-class adds padding around an element,
and the `margin` micro-class adds margins.
Variants of these (indicated by modifier micro-classes) provide more or less spacing,
more or less margins,
and norizontal and vertical padding.

Example of spaced children:

```
<div class="spaced">
  <div></div>
  <div></div>
</div>
```

Example of padding:

```
<div class="padding">
<div class="padding horizontal en">
<div class="padding top left hair">
```

A "hair" is a standard length used in Morass, which corresponds to 1/6 em.
An "en" is half an "em".

### flexbox

Morass expects most layout to be done using flexbox,
and provides a solid set of micro-classes to control them.
The micro-classes available include ones to control direction, wrapping, and alignment.
You'll no longer need to struggle with trying to remember the names or meanings or values of
properties like `align-items`.

Examples of flexbox:

```
<div class="flex">

<div class="flex vertical justify">
  <div class="grow">
```

### Display and visibility

```
<div class="show">
<div class="inline">
<div class="hide">
<div class="visible">
<div class="invisible">
```

### Font weight and size

```
<div class="bold">
```

And many other variations including `light`, `normal`, and `heavy`.

```
<div class="small">
<div class="large">
```

And many other variations, including `x-large`, `x-small`, `smaller`, `larger`, etc.

### Opacity

```
<div class="opaque">
<div class="semi-opaque">
<div class="transparent">
```

### Z-index

```
<div class="back">
<div class="front">
<div class="backmost">
<div class="frontmost">
```

### Position

```
<div class="absolute">
<div class="relative">
<div class="fixed">
```

### Text transforms

```
<div class="text upper">
<div class="text lower">
<div class="text capitalize">
<div class="all-caps">
```

### Transitions

```
<div class="transition fast linear delay">
```


Note on Preprocessors
---------------------

We hate CSS preprocessors.
They are bulky, slow, and promote bad rule-writing practices.
However, preprocessors do provide some useful functionality.
The key feature is the use of variables.
Since we do want to use variables, we do use a preprocessor.
The preprocessor we use is suitCSS, a forward-looking system with a clear migration path to CSS4.
It also supports imports, allowing us to write our code modularly,
as well as auto-prefixing.

Installation
------------

    npm install --save-dev morass

Then, in some file that the suitCSS compilation will process:

    @import "morass";

To use the pre-built version, use `dist/index.css`.
Notice, however, that this will not handle any variables you define yourself.

For your own Morass-type styles, we recommend following the Morass directory structure of `elements`/`modifiers`/`variables`.
Note that suitCSS always uses the most recently defined variable value.
Therefore, if you include your own variable definitions after importing Morass, they will take effect.


Micro-class reference
---------------

 Name                 | Module      | Description                   |
| -------------------- | ----------- | ----------------------------- |
| absolute             | position    | Absolute positioniong.        |
| align-bottom         | flex        | Align flex items to bottom.   |
| align-center         | flex        | Align flex items to left.     |
| align-center         | ruby        | Align ruby to center.         |
| align-left           | flex        | Align flex items to left.     |
| align-middle         | flex        | Align flex items to middle.   |
| align-right          | flex        | Align flex items to right.    |
| align-start          | ruby        | Align ruby to start.          |
| align-top            | flex        | Align flex items to top.      |
| alpha                | list        | Alpha list markers.           |
| backmost             | z-index     | Set element to very back.     |
| background           | background  | Set background color.         |
| body                 | font-family | Body font family.             |
| behind               | z-index     | Set element behind.           |
| bold                 | text        | Bold font.                    |
| bolder               | text        | Increase boldness.            |
| border               | border      | Set border.                   |
| bottom               | padding     | Pad on bottom.                |
| bottom               | margin      | Add margin on bottom.         |
| capitalize           | text-transform | Capitalized text.          |
| circle               | list        | Circle list marker.           |
| condensed            | letter-spacing | Condense space between letters. |
| contain              | background  | Clip background image         |
| cover                | background  | Letterbox background image    |
| decimal              | list        | Decimal list markers.         |
| default              | colors      | Default color.                |
| delay                | transition  | Delay transition.             |
| dashed               | border      | Dashed border.                |
| delay-less           | transition  | Shorter delay transition.     |
| delay-more           | transition  | Longer delay transition.      |
| demi-bold            | font-weight | Weight between normal and bold. |
| @desktop             |             | Apply only on desktop.        |
| disc                 | list        | Disc list marker.             |
| dotted               | border      | Dotted border.                |
| double-spaced        | line-height | Double line spacing.          |
| ease                 | transition  | Transition timing "ease".     |
| ease-in              | transition  | Transition timing "ease-in"   |
| ease-out             | transition  | Transition timing "ease-out"  |
| ease-in-out          | transition  | Transition timing "ease-in-out" |
| em                   | padding, margin     | Padding or margin of 1 em.              |
| en                   | padding, margin     | Padding or margin of 1/2 em.            |
| emphasis             | font-style  | Italics.                      |
| error                | colors      | Error color.                  |
| expanded             | letter-spacing | Expand space between letters. |
| expanded-more        | letter-spacing | More space between letters. |
| extra-bold           | font-weight | Font weight 800.              |
| extra-light          | font-weight | Extra-light font.             |
| fast                 | transition  | Fast transition.              |
| faster               | transition  | Very fast transition.         |
| first                | flex        | Place item first in flex order. |
| fixed                | position    | Fixed positioniong.           |
| flex                 | flex        | Set up flex container.        |
| four-columns         | column      | Split content into 4 columns. |
| front                | z-index     | Set element in front.         |
| frontmost            | z-index     | Set element to very front.    |
| full-height          | dimension   | Occupy full height.           |
| full-width           | dimension   | Occupy full width.            |
| groove               | border      | Groove-style border.          |
| grow                 | flex        | Allow this item to grow.      |
| hair                 | padding, margin     | Padding or margin of 1/6 em.            |
| hairline             | font-weight | Lightest font.                |
| half-height          | dimension   | Occupy half height.           |
| half-width           | dimension   | Occupy half width.            |
| heading              | font-family | Heading font family.          |
| heavy                | font-weight | Heaviest font.                |
| hide, hidden         | display     | Hide element.                 |
| honor-newline        | white-space | Treat newlines as newlines.   |
| horizontal           | flex        | Row-oriented flex container.  |
| horizontal           | padding, margin     | Padding or margin on left and right.    |
| horizontal           | overflow    | Set horizontal overflow.      |
| :hover               |             | Apply rules in hover state    |
| in-front             | z-index     | Set element in front.         |
| indent               | indent      | Indent text.                  |
| indent-more          | indent      | Indent text more.             |
| inline               | flex        | Set up inline flex container. |
| inline               | display     | Inline display.               |
| inline-block         | display     | Inline block display.         |
| inset                | border      | Inset-style border.           |
| inside               | list        | Inside list markers.          |
| inter-character      | ruby        | Ruby between characters.      |
| invert               | background  | Invert background dark/light. |
| invisible            | visibility  | Make invisible.               |
| italic               | font-style  | Italics.                      |
| justify              | flex        | Justify flexbox items.        |
| justify              | ruby        | Justify ruby.                 |
| justify-gap          | flex        | Justify flexbox items with gap. |
| justify-gap          | ruby        | Justify ruby with gap.        |
| justify-h            | flex        | Justify flexbox items horizontally. |
| justify-h-gap        | flex        | Justify flexbox items horizontally with gap. |
| justify-v            | flex        | Justify flexbox items vertically. |
| justify-v-gap        | flex        | Justify flexbox items vertically with gap. |
| justify              | flex        | Justify flexbox items.        |
| large                | size        | large font size               |
| larger               | size        | larger font-size              |
| last                 | flex        | Place item last in flex order. |
| left                 | padding, margin     | Padding or margin on left.                  |
| left                 | ruby        | Ruby to left.                 |
| light                | text        | Light font (300).             |
| lighter              | text        | Decrease boldness.            |
| linear               | transition  | Transition timing "linear"    |
| list                 | list        | Define list.                  |
| loose                | space       | Looser inter-item spacing.    |
| lower                | text-transform | Lower-cased text.          |
| lower                | list        | Lower-cased list markers.     |
| margin               | margin      | Add margin to element.        |
| medium               | size        | Medium font size.             |
| medium               | border      | Medium border width.          |
| medium-weight        | font-weight | Medium font weight.           |
| monospace            | font        | Monospaced font.              |
| norepeat             | background  | Do not repeat background.     |
| none                 | list        | No list markers.              |
| nowrap               | white-space | Do not wrap.                  |
| opaque               | opacity     | Full opacity.                 |
| outset               | border      | Outset-style border.          |
| outside              | list        | Outside list markers.         |
| over                 | ruby        | Ruby on top.                  |
| overflow             | overflow    | Set overflow behavior.        |
| padding              | padding     | Pad an element.               |
| pointer              | cursor      | Pointing cursor.              |
| preserve-whitespace  | white-space | Do not collapse whitespace.   |
| primary              | colors      | Primary color.                |
| relative             | position    | Relative positioniong.        |
| repeat-x             | background  | Repeat background in x direction. |
| repeat-y             | background  | Repeat background in y direction. |
| resize               | resize      | Allow resizing of element.    |
| resize-x             | resize      | Allow resizing of element horizontally. |
| resize-y             | resize      | Allow resizing of element vertically. |
| reverse              | flex        | Reverse flex order.           |
| ridge                | border      | Ridge-style border.           |
| right                | padding, margin     | Padding or margin on right.                 |
| right                | ruby        | Ruby to right.                |
| roman                | list        | Roman list markers.           |
| rounded              | border      | Rounded border.               |
| rounded-more         | border      | More rounded border.          |
| self-baseline        | flex        | Align flex child to baseline. |
| self-bottom          | flex        | Align flex child to bottom.   |
| self-center          | flex        | Align flex child to center.   |
| self-left            | flex        | Align flex child to left.     |
| self-middle          | flex        | Align flex child to middle.   |
| self-right           | flex        | Align flex child to right.    |
| self-stretch         | flex        | Stretch flex child.           |
| self-top             | flex        | Align flex child to top.      |
| semi-bold            | font-weight | Weight between normal and bold. |
| semi-opaque          | opacity     | 50% opacity.                  |
| show                 | display     | Display as block.             |
| single-spaced        | line-height | Normal (single) line spacing. |
| slow                 | transition  | Slow transition.              |
| slower               | transition  | Very slow transition.         |
| small                | size        | Small font size.              |
| smaller              | size        | Smaller font size             |
| small-caps           | font-variant | Small caps font variant.     |
| solid                | border      | Solid border.                 |
| space-and-a-half     | line-height | 1.5 line spacing.             |
| square               | list        | Square list marker.           |
| step-start           | transition  | Transition timing "step-start" |
| step-end             | transition  | Transition timing "step-end"  |
| strong               | font-weight | Bold text.                    |
| success              | colors      | Success color.                |
| tight                | space       | Tighter inter-item spacing.   |
| thick                | border      | Thick border.                  |
| thin                 | border      | Thin border.                  |
| top                  | padding, margin     | Padding or margin on top. |
| transparent          | opacity     | Zero opacity.                 |
| two-columns          | column      | Split content into 2 columns. |
| three-columns        | column      | Split content into 3 columns. |
| ultra-bold           | font-weight | Bolder than bold.             |
| ultra-light          | font-weight | Extra-light font.             |
| under                | ruby        | Ruby on bottom.               |
| underline            | font-decoration | Underline text.           |
| upper                | text-transform | Uppercased text.           |
| upper                | list        | Uppercased list marker.       |
| vertical             | flex        | Column-oriented flex container. |
| vertical             | padding, margin     | Padding or margin on top and bottom. |
| vertical             | overflow    | Set vertical                  |
| visible              | visibility  | Make visible.                 |
| wrap                 | flex        | Wrap flexbox items.           |
| x-bold               | font-weight | Font weight 800.              |
| x-grow               | flex        | Allow this item to grow more. |
| x-light              | font-weight | Extra-light font.             |
| x-loose              | space       | Very loose inter-item spacing. |
| x-small              | size        | Very small font size.         |
| x-large              | size        | Very large font size.         |
| x-strong             | font-weight | Very bold text.               |
| xx-bold              | font-weight | Font weight 900.              |
| xx-large             | size        | Very very large font size.    |
| xx-small             | size        | Very very small font-size.    |
| warn                 | colors      | Warning color.                |
| white-space-normal   | white-space | Restore white space.          |
| zero                 | padding, margin     | Zero padding or margin. |
