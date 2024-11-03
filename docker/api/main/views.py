from django.shortcuts import render

# Create your views here.
def index(request):
  content = {
  'message': 'こんにちは！Djangoテンプレート！'
  }
  return render(request, 'main/index.html', content)


def form(request):
  params = {}
  if(request.method == 'POST'):
    name = request.POST['name']
    params = {
      'name': name,
    }
  return render(request, 'main/form.html', params)