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

Morass systems make a lot of use of flexbox. For instance, the classic `float: right` is written as

    <div class="flex justify middle">
      <div>I'm on the left</div>
      <div>I'm on the right</div>
    </div>

with the bonus that the middles of the elements to the left and right are vertically aligned.

Morass is independent of any CSS framework.
But it uses the suitCSS preprocessor framework, mainly to provide variables.


Background and Motivation
-------------------------

Our current CSS systems are a steaming pile of shit.
We have thousands of lines of CSS.
Half of these lines of CSS are not even used,
because no one can remember what they do and are afraid to touch them.
Most of the rest is redundant, verbose, and duplicative.

Because CSS systems are most often created by "UI designers", rather than engineers,
basic computing principles of orthogonality and composition are ignored.

We have developed an addiction to CSS preprocessors which do no more
than provide some basic syntactic sugar, and, more perniciously,
promote bad design practices.
Huge sets of rules with complex selectors bog down the browser.

Each new page we write requires dozens or hundreds of new lines of CSS.
Any UI change requires parallel changes to both HTML and CSS.
We use CSS in a way which results in inconsistent UIs.
There is no reasonable way to understand the CSS, or convince ourselves that it is correct, or test it.

In a futile attempt to escape this maze, we bring in monstrously large, over-engineered
frameworks such as Bootstrap, which add a massive surface area of new classes to learn and deal with.
Just as the archaic jQuery attempts to solve JavaScript problems which no longer need solving,
Bootstrap attempts to solve styling problems which no longer need solving,
in particular its cumbersome and confusing grid system.
In addition to added complexity for the programmer, these massive frameworks slow down
build times, page loading times, and rendering times.
They also make undue use of obsolete CSS features such as floats,
while failing to support modern CSS features such as flexbox.

As we proliferate these obese classes, we soon run into namespacing problems.
Names conflict with each other, and we end up needing weird namespace solutions which result
in classes with names like `Book__chapter--title`.
Then we start relying on preprocessors to handle these over-named classes,
which "help" us by allowing us to write weird-looking rules such as

    .Book {
      &__chapter {
        &--title {
          text-align: center;
          }
        }
     }


Micro-classes
-------------

Morass is a collection of micro-classes: CSS classes which often define no more than one property.
These classes are assigned to HTML elements, which in this approach may have two or five or even ten classes.
We are moving the styling logic back into the HTML!
The styling in the HTML becomes semnatic and readable.
Instead of having a class "book-list-entry" which contains 20 properties over in some distant CSS file,
we add three or four classes to HTML which clearly identify the styling behavior of the entry.
In the best case, which is readily realizable in practice, no element-specific class is necessary at all.

In cases where the provided micro-classes do not or can not provide the functionality you need,
such as box shadows perhaps,
we recommend defining your own generic micro-classes,
hopefully following the Morass design principles.


Use of elements
---------------

In existing CSS, we see odd rules such as

    <h1 class="h1">...

Then

    .h1 { margin-top: 0; font-size: 24px; }

One is left seriously wondering where the people who write this kind of code were during their Intro to CSS class.
If we want to change the styling of an `h1`, we should simply modify the `h1`.
More fundamentally, why are we changing basics of a element like `h1` away from the perfectly reasonable defaults set by the user agent style sheet?
The same person that is removing the top margin from the `h1` is probably putting back some spacing around it in some other place in his code.
Every programmer who now wants to write an `h1` must remember to add the class `.h1`.
He or she must remember that it magically removes the top margin and changes the font size.

Morass itself does not modify built-in element styles.
However, it recommends this as the preferred way to add behavior to standard elements such as `h1` or `a` **when necessary**.
This reduces the number of classes required and keeps the HTML cleaner.

Preprocessors
-------------

We hate CSS preprocessors.
They are bulky, slow, and promote bad rule-writing practices.
However, preprocessors do provide some useful functionality.
The key feature is the use of variables.
Since we do want to use variables, we do use a preprocessor.
The preprocessor we use is suitCSS, a forward-looking system with a clear migration path to CSS4.
It also supports imports, allowing us to write our code modularly,
as well as auto-prefixing.

Design Principles And Features
------------------------------

### Performance

CSS is rarely the major bottleneck in application performance.
Of course there may be exceptions involving huge systems,
or poorly written CSS rules,
or use of CSS properites with known performance implications.

Morass offers improved performance because the dozens or hundreds of CSS files often seen in
poorly-engineered applications are much smaller (or not needed at all).
This reduces both download and processing time.

### Floats

Morass does not use or support floats.

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


### Spacing

Some large proportion of CSS rules control spacing.
People use top margins and bottom margins and top padding and bottom padding and special spacing elements.
Morass provides two simple mechanisms for controlling spacing.
The `spaced` micro-class adds space between child elements.
The `padding` micro-class adds padding around an element.
Variants of these (indicated by modifier micro-classes) provide more spacing, less spacing, more padding, less padding,
and norizontal and vertical padding.

### flexbox

Morass expects most layout to be done using flexboxes,
and provides a solid set of micro-classes to control them.
The micro-classes available include ones to control direction, wrapping,
and alignment. You'll no longer need to struggle with trying to remember the names or meanings or values of
properties like `align-items`.

### `!important`

Morass neither needs nor uses `!important`, and we recommend you do not either.

### Inline styles

Some element-specific styling can obviously not be handled with micro-classes,
`background-image` for example.
If a page has only one or two such cases, we suggest inlining the rule with the `style` attribute.
We are not religious zealots, and this can be a better approach than creating a separate CSS file
and defining an additional class merely in order to target the element.

### Responsiveness

Currently, Morass does not explicitly support responsiveness.
We are not a big fan of current approaches to responsiveness,
which involve baroque constructs such as `<div class="col-md-4 col-sm-8">`.
suitCSS supports the `@custom-media` directive for defining breakpoints.
We suggest judicious use of this with your own micro-classes to handle responsivity, as in

```css
@media (--sm-viewport) { }
```

Installation
------------

    npm install morass

Then, in some file that the suitCSS compilation will process:

    @import "morass";

For your own Morass-type styles, we recommend following the Morass directory structure of `elements`/`modifiers`/`variables`.
Note that suitCSS always uses the most recently define variable value.
Therefore, if you include your own variable definitions after importing Morass, they will take effect.


Micro-class reference
---------------

| Name                 | Module      | Description                   |
| -------------------- | ----------- | ----------------------------- |
| absolute             | position    | Absolute positioniong.        |
| fixed                | position    | Fixed positioniong.           |
| behind               | z-index     | Set element behind.           |
| bg-default           | background  | Default color background.     |
| bg-error             | background  | Error color background.       |
| bg-primary           | background  | Primary color background.     |
| bg-secondary         | background  | Secondary color background.   |
| bg-success           | background  | Success color background.     |
| bg-warn              | background  | Warning color background.     |
| bold                 | text        | Bold font.                    |
| bolder               | text        | Increase boldness.            |
| border-primary       | border      | Primary border color.         |
| border-secondary     | border      | Secondary border color.       |
| border-success       | border      | Success border color.         |
| border-warn          | border      | Warning border color.         |
| border-error         | border      | Error border color.           |
| bottom               | padding     | Pad on bottom.                |
| bottom               | margin      | Add margin on bottom.         |
| capitalize           | text-transform | Capitalized text.          |
| condensed            | letter-spacing | Condense space between letters. |
| default              | colors      | Default color.                |
| delay                | transition  | Delay transition.             |
| dashed               | border      | Dashed border.                |
| delay-less           | transition  | Shorter delay transition.     |
| delay-more           | transition  | Longer delay transition.      |
| demi-bold            | font-weight | Weight between normal and bold. |
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
| flex                 | flex        | Set up flex container.        |
| four-columns         | column      | Split content into 4 columns. |
| full-height          | dimension   | Occupy full height.           |
| full-width           | dimension   | Occupy full width.            |
| groove               | border      | Groove-style border.          |
| hair                 | padding, margin     | Padding or margin of 1/6 em.            |
| hairline             | font-weight | Lightest font.                |
| half-height          | dimension   | Occupy half height.           |
| half-width           | dimension   | Occupy half width.            |
| heavy                | font-weight | Heaviest font.                |
| hide, hidden         | display     | Hide element.                 |
| honor-newline        | white-space | Treat newlines as newlines.   |
| horizontal           | flex        | Row-oriented flex container.  |
| horizontal           | padding, margin     | Padding or margin on left and right.    |
| infront              | z-index     | Set element in front.         |
| indent               | indent      | Indent text.                  |
| indent-more          | indent      | Indent text more.             |
| inline               | flex        | Set up inline flex container. |
| inline               | display     | Inline display.               |
| inline-block         | display     | Inline block display.         |
| inset                | border      | Inset-style border.           |
| invert               | background  | Invert background dark/light. |
| invisible            | visibility  | Make invisible.               |
| italic               | font-style  | Italics.                      |
| large                | size        | large font size               |
| larger               | size        | larger font-size              |
| last                 | flex        | Place item last in flex order. |
| left                 | padding, margin     | Padding or margin on left.                  |
| light                | text        | Light font (300).             |
| lighter              | text        | Decrease boldness.            |
| linear               | transition  | Transition timing "linear"    |
| loose                | space       | Looser inter-item spacing.    |
| lowercase            | text-transform | Lower-cased text.          |
| margin               | margin      | Add margin to element.        |
| medium               | size        | Medium font size.             |
| medium               | border      | Medium border width.          |
| medium-weight        | font-weight | Medium font weight.           |
| monospace            | font        | Monospaced font.              |
| norepeat             | background  | Do not repeat background.     |
| nowrap               | white-space | Do not wrap.                  |
| opaque               | opacity     | Full opacity.                 |
| outset               | border      | Outset-style border.          |
| padding              | padding     | Pad an element.               |
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
| rounded              | border      | Rounded border.               |
| rounded-more         | border      | More rounded border.          |
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
| underline            | font-decoration | Underline text.           |
| uppercase            | text-transform | Uppercased text.           |
| vertical             | flex        | Column-oriented flex container. |
| vertical             | padding, margin     | Padding or margin on top and bottom. |
| visible              | visibility  | Make visible.                 |
| x-bold               | font-weight | Font weight 800.              |
| x-light              | font-weight | Extra-light font.             |
| x-loose              | space       | Very loose inter-item spacing. |
| x-small              | size        | Very small font size.         |
| x-large              | size        | Very large font size.         |
| x-strong             | font-weight | Very bold text.               |
| xx-large             | size        | Very very large font size.    |
| xx-small             | size        | Very very small font-size.    |
| warn                 | colors      | Warning color.                |
| white-space-normal   | white-space | Restore white space.          |
| zero                 | padding, margin     | Zero padding or margin. |
