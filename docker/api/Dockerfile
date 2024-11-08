FROM python:3.11.1
ENV PYTHONUNBUFFERED 1
RUN mkdir /api
WORKDIR /api
COPY ./requirements.txt /api
RUN pip install --upgrade pip && \
    pip install -r requirements.txt && \
    pip install djangorestframework && \
    pip install django-cors-headers