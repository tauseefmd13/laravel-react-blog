<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>React Laravel Blog</title>

    <link rel="stylesheet" href="{{ asset('assets/website') }}/css/default.css">
    <link rel="stylesheet" href="{{ asset('assets/website') }}/css/layout.css">
    <link rel="stylesheet" href="{{ asset('assets/website') }}/css/media-queries.css">

    <script src="{{ asset('assets/website') }}/js/modernizr.js"></script>

</head>
<body>

    <div id="app"></div>

    <script src="{{ asset('js/website.js') }}" type="text/javascript"></script>
</body>
</html>
