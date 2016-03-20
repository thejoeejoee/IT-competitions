if (typeof jQuery == "undefined") {
    throw new Error('Tables require jQuery.');
}
var tables = {
    title: "",
    columnCount: 0,
    headerTitles: [],
    maxRowCount: null,
    data: [],
    id: "",
    $: null,
    styles: 'table{background-color:lightblue}table tbody tr:hover,.hover{background-color:lightcoral}td{border:1px solid black}',

    _addRow: function (data) {
        if (data.length != this.columnCount) {
            alert('Count of given data in invalid.');
            return;
        }
        this.data[this.data.length] = data;
    },

    addRow: function () {
        this._addRow(arguments);
    },

    addRowFromString: function (string) {
        this._addRow(string.split(';'));
    },

    addRowsJson: function (json) {
        for (var i = 0; i++; i < json.length) {
            this._addRow(json[i]);
        }
    },

    setHeaderTitles: function (headerTitles) {
        if (headerTitles.length != this.columnCount) {
            alert('Invalid count of titles given.');
            return;
        }
        this.headerTitles = headerTitles;
    },

    setColumnCount: function (columnCount) {
        this.columnCount = columnCount;
    },

    setTitle: function (title) {
        this.title = title;
    },

    setRowCount: function (maxRowCount) {
        this.maxRowCount = maxRowCount;
    },

    createTable: function (id) {
        $('#' + id).html(this._render());
    },

    _render: function () {
        var $parts = this._renderMainParts();
        $parts.append(this._renderBody());
        this._initHovers($parts);
        this._initEditing($parts);
        this._initSorting($parts);
        return $parts;
    },

    _renderMainParts: function () {
        var $table = $('<table></table>');
        $table.append($('<caption></caption>').text(this.title));
        var $head = $('<thead><tr></tr></thead>');
        var $headTr = $head.find('tr');
        $.each(this.headerTitles, function (i, title) {
            $headTr.append($('<td></td>').text(title).data('column', i));
        });
        return $table.append($head).append($('<style></style>').html(this.styles));
    },

    _renderBody: function () {
        var rowsToRender = this.data;
        if (this.maxRowCount || this.maxRowCount === 0) {
            rowsToRender = rowsToRender.slice(0, this.maxRowCount);
        }
        var $body = $('<tbody></tbody>');
        $.each(rowsToRender, function (row_i, row) {
            var $tr = $('<tr></tr>');
            $.each(row, function (column_i, cell) {
                $('<td></td>').text(cell).appendTo($tr).data('row', row_i).data('column', column_i);
            });
            $body.append($tr);
        });
        return $body;
    },

    _initHovers: function ($parts) {
        $parts.find('thead td')
            .hover(function (e) {
                var i = $(e.target).index();
                $parts.find('tr td:nth-child(' + (i + 1) + ')').addClass('hover');
            }, function (e) {
                var i = $(e.target).index();
                $parts.find('tr td:nth-child(' + (i + 1) + ')').removeClass('hover');
            });
    },

    _initEditing: function ($parts) {
        var data = this.data;
        $parts.find('tbody').on('dblclick', 'td', function (e) {
            var $target = $(e.target);
            $target.html($('<textarea></textarea>').val($target.text())).keypress(function (key_e) {
                if (key_e.which == 13) { // enter
                    data[$target.data().row][$target.data().column] = $target.find('textarea').val();
                    $target.html($target.find('textarea').val());
                }
            });
            $target.find('textarea').focus();
        });
    },

    _initSorting: function ($parts) {
        $parts.find('thead td').click(function (e) {
            var $th = $(this);
            $th.toggleClass('asc');
            var byIndex = $(e.target).data().column;
            var $sorted = $parts.find('tbody tr').sort(function (a, b) {
                var $a = $(a).find('td:nth-child(' + (byIndex + 1) + ')'),
                    $b = $(b).find('td:nth-child(' + (byIndex + 1) + ')');

                if (isNaN(parseFloat($a.text()))) { // comparing texts
                    if ($th.hasClass('asc')) {
                        return $a.text().localeCompare($b.text());
                    } else {
                        return $b.text().localeCompare($a.text());
                    }
                }
                if ($th.hasClass('asc')) {
                    return ($a.text() > $b.text()) ? 1 : 0;
                } else {
                    return ($a.text() < $b.text()) ? 1 : 0;
                }
            }).appendTo($parts);
        });
    }
};