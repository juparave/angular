---
title: "Angular Topics"
layout: default
nav_order: 1
---

## Angular Topics

<ul>
{% assign angular_pages = site.pages | where_exp: "page", "page.path contains 'angular/'" | where_exp: "page", "page.name != 'index.md'" | sort: "nav_order" %}
{% for page in angular_pages %}
  <li><a href="{{ site.baseurl }}{{ page.url }}">{{ page.title | default: page.name }}</a></li>
{% endfor %}
</ul>

## External Resources

* [Angular Official Style Guide](https://angular.dev/guide/style-guide)
* [Angular Best Practices (Updated 2024/2025)](https://aglowiditsolutions.com/blog/angular-best-practices/)
