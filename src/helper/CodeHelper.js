export function setAxiosCode(url,data,contentType,method){
    var call = `var config = {
        method: ${method},
        url: ${url},
        headers: { 
          'Content-Type': ${contentType}
        },
        data : ${data}
      };

      console.log(config);

    axios(config).then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err)
        })`

      return({code:<div>{call}</div>});
}

export function setJavaOkHTTP(url,data,contentType,method){
    var call = `OkHttpClient client = new OkHttpClient();
    RequestBody body = RequestBody.create(${contentType}, ${data});
    Request request = new Request.Builder()
        .url("${url}")
        .method("${method}", body)
        .build();
    client.newCall(request).enqueue(new Callback() {
        @Override
        public void onFailure(Call call, IOException e) {
            e.printStackTrace();
        }

        @Override
        public void onResponse(Call call, Response response) throws IOException {
            System.out.println(response.body().string());
        }
    });`

    return({code:<div>{call}</div>});
}


export function setXHR(url,data,contentType,method){
    var call = `var xhr = new XMLHttpRequest();
    xhr.open("${method}", "${url}", true);
    xhr.setRequestHeader("Content-Type", "${contentType}");
    xhr.send(${data});`

    return({code:<div>{call}</div>});
}

export function setRestSharp(url,data,contentType,method){
    var call = `var client = new RestClient();
    var request = new RestRequest("${url}", Method.${method});
    request.AddHeader("Content-Type", "${contentType}");
    request.AddParameter("application/json", ${data}, ParameterType.RequestBody);
    client.ExecuteAsync(request, response => {
        Console.WriteLine(response.Content);
    });`

    return({code:<div>{call}</div>});
}