from django import template

register = template.Library()

@register.filter
def sum_items(items):
    return sum(float(item['price']) * item['quantity'] for item in items)

@register.filter
def mul(value, arg):
    return float(value) * float(arg)