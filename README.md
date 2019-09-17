# Anchor

> :anchor: Click and go to target. Pretty simple with only ~2KB and without dependencies.

[Live Demo](https://jsfiddle.net/d854bwxd/2/ )

## Install

### Bower

```
bower install anchor.js --save
```

### npm

```
npm install js.anchor --save
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/gh/cezarlz/anchor.js@master/dist/anchor.min.js"></script>
```

## Usage

The simplest way.

```html
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

```html
<header>
  <button
    data-anchor="#jobs"
    data-anchor-duration="2000"
    data-anchor-offset="200"
  >
    View our Jobs!
  </button>

  <div id="jobs">
    ...
  </div>
</header>
```

## Options

```html
<a
  href="#fallback"
  data-anchor=".clientes-container"
  data-anchor-duration="1200"
  data-anchor-offset="80"
  data-anchor-callback="done"
  data-anchor-easing="myCustomEasing"
>
  Our clients
</a>
```

### Attributes

Attribute|Required?|Default|Description
---------|---------|-------|-----------
`data-anchor`|Yes|-|A CSS like selector to your target.
`data-anchor-duration`|No|`800`|In milliseconds.
`data-anchor-offset`|No|`0`|Self descriptive :)
`data-anchor-callback`|No|-|The callback will be called when the scroll is finished.
`data-anchor-easing`|No|`easeInOutQuad`|The easing function. You can create your custom easing. Yes!

#### Callback

```html
<button
  data-anchor=".container"
  data-anchor-callback="done"
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

```html
<button
  data-anchor=".container"
  data-anchor-easing="myCustomEasing"
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
