{% for file in site.static_files %}
{% if file.extname == ".md" %}
[{{ file.basename }}]({{site.baseurl}}/{{file.basename}}.html)
{% endif %}
{% endfor %}

[Clean code and best practices for Angular](https://www.freecodecamp.org/news/best-practices-for-a-clean-and-performant-angular-application-288e7b39eb6f/)

[Top 10 Angular Best Practices to Adapt in 2020](https://aglowiditsolutions.com/blog/angular-best-practices/)
