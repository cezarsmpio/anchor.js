# Anchor

> :anchor: Click and go to target. Pretty simple with only 1.85KB and without dependencies.

## Install

### Bower

```
bower install anchor.js --save
```

### npm

```
npm install anchor.js --save
```

### CDN

```html5
<script src="http://raw"></script>
```

## Usage

The simplest way.

```html5
<header>
  <button data-anchor=".contact">
    Contact Us!
  </button>

  <section class="contact">
    ...
  </section>
</header>
```

```javascript
var anchor = new Anchor();

anchor.init();
```

Do you want more options? Sure!

```html5
<header>
  <button
    data-anchor="#jobs"
    data-duration="2000"
    data-offset="200"
  >
    View our Jobs!
  </button>

  <div id="jobs">
    ...
  </div>
</header>
```

## Options

```html5
<a
  href="#fallback"
  data-anchor=".clientes-container"
  data-duration="1200"
  data-offset="80"
  data-callback="done"
  data-easing="myCustomEasing"
>
  Our clients
</a>
```

### Defaults

Attribute|Required?|Default|Description
---------|---------|-------|-----------
`data-anchor`|Yes|-|A CSS like selector to your target.
`data-duration`|No|`800`|In milliseconds.
`data-offset`|No|`0`|Self descriptive :)
`data-callback`|No|-|The callback will be called when the scroll is finished.
`data-easing`|No|`easeInOutQuad`|The easing function. You can create your custom easing. Yes!

#### Callback

```html5
<button
  data-anchor=".container"
  data-callback="done"
>
  Our clients
</button>
```

```javascript
var anchor = new Anchor();
anchor.init();

function done() {
  alert('Scroll reached the target!');
}
```

#### Easing

You can create your custom easing: [Click here to create](http://goo.gl/n4qV3)

```html5
<button
  data-anchor=".container"
  data-easing="myCustomEasing"
>
  Our clients
</button>
```

```javascript
var anchor = new Anchor({
  easings: {
    // Example with 'back in quartic' easing
    myCustomEasing: function(t, b, c, d) {
      var ts=(t/=d)*t;
      var tc=ts*t;
      return b+c*(2*ts*ts + 2*tc + -3*ts);
    }
  }
});

anchor.init();
```

## License

MIT.

Did you like it? Fork and contribute ;)

Made with :heart: